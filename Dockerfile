# Multi-stage Docker build for 4Browser

FROM ubuntu:24.04 as builder

# Install core dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    curl \
    git \
    libglfw3-dev \
    libgl1-mesa-dev \
    libssl-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /workspace

# Copy source
COPY . .

# Build C++ components
RUN mkdir -p build && \
    cd build && \
    cmake -DCMAKE_BUILD_TYPE=Release .. && \
    make -j$(nproc)

# Build Rust components
RUN cargo build --release

# Install Node dependencies
RUN npm ci

# Build UI
RUN npm run build

# Final runtime image
FROM ubuntu:24.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libglfw3 \
    libgl1-mesa \
    libssl3 \
    zlib1g \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built artifacts from builder
COPY --from=builder /workspace/build/4browser /app/
COPY --from=builder /workspace/config /app/config/
COPY --from=builder /workspace/dist /app/dist/

# Expose UI port (optional)
EXPOSE 3000

# Entry point
ENTRYPOINT ["/app/4browser"]
