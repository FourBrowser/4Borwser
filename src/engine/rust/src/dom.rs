// DOM tree module
// Represents the Document Object Model

use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Node {
    pub node_type: NodeType,
    pub tag_name: Option<String>,
    pub text: Option<String>,
    pub attributes: HashMap<String, String>,
    pub children: Vec<Node>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum NodeType {
    Element,
    Text,
    Document,
    Comment,
}

pub struct DOMTree {
    pub root: Node,
}

impl DOMTree {
    pub fn new() -> Self {
        Self {
            root: Node {
                node_type: NodeType::Document,
                tag_name: None,
                text: None,
                attributes: HashMap::new(),
                children: vec![],
            },
        }
    }

    pub fn from_html(html: &str) -> Self {
        // Simple HTML parsing (in production, use html5ever)
        let mut tree = Self::new();
        
        // TODO: Implement proper HTML parsing
        // For now, create basic structure
        tree.root = Node {
            node_type: NodeType::Element,
            tag_name: Some("html".to_string()),
            text: None,
            attributes: HashMap::new(),
            children: vec![],
        };

        tree
    }

    pub fn query_selector(&self, selector: &str) -> Option<&Node> {
        // TODO: Implement CSS selector matching
        None
    }

    pub fn get_all_elements(&self) -> Vec<&Node> {
        self.traverse_elements(&self.root)
    }

    fn traverse_elements(&self, node: &Node) -> Vec<&Node> {
        let mut elements = vec![];
        
        if matches!(node.node_type, NodeType::Element) {
            elements.push(node);
        }

        for child in &node.children {
            elements.extend(self.traverse_elements(child));
        }

        elements
    }
}
