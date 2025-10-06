#!/usr/bin/env bash
# forge-sdd-toolkit installer

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "🚀 forge-sdd-toolkit installer"
echo ""

# Check Python 3
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is required but not installed${NC}"
    echo "Please install Python 3: https://www.python.org/downloads/"
    exit 1
fi

# Check git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is required but not installed${NC}"
    exit 1
fi

# Create installation directory
INSTALL_DIR="$HOME/.forge-sdd-toolkit"
echo -e "📦 Installing to: ${YELLOW}$INSTALL_DIR${NC}"

# Clone or update repository
if [ -d "$INSTALL_DIR" ]; then
    echo "⏳ Updating existing installation..."
    cd "$INSTALL_DIR"
    git pull origin main
else
    echo "⏳ Cloning repository..."
    git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git "$INSTALL_DIR"
fi

# Make CLI executable
chmod +x "$INSTALL_DIR/bin/forge-sdd"

# Create symlink
BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

if [ -L "$BIN_DIR/forge-sdd" ]; then
    rm "$BIN_DIR/forge-sdd"
fi

ln -s "$INSTALL_DIR/bin/forge-sdd" "$BIN_DIR/forge-sdd"

echo ""
echo -e "${GREEN}✅ Installation complete!${NC}"
echo ""

# Check if ~/.local/bin is in PATH
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo -e "${YELLOW}⚠️  Add ~/.local/bin to your PATH:${NC}"
    echo ""
    
    # Detect shell
    if [ -n "$ZSH_VERSION" ]; then
        echo "  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc"
        echo "  source ~/.zshrc"
    elif [ -n "$BASH_VERSION" ]; then
        echo "  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.bashrc"
        echo "  source ~/.bashrc"
    else
        echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
    fi
    echo ""
fi

echo "📋 Quick Start:"
echo ""
echo "  forge-sdd init my-forge-app"
echo "  cd my-forge-app"
echo "  code ."
echo ""
echo "Then open GitHub Copilot and type: @forge-ideate"
echo ""
