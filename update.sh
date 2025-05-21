#!/bin/bash
# Script to update the portfolio website from GitHub

# Set variables
GITHUB_USERNAME="mayur5204"
REPO_NAME="portfolio-website"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print colored output
print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# Check if Git is installed
if ! [ -x "$(command -v git)" ]; then
  print_error "Error: git is not installed."
  exit 1
fi

# Check if npm is installed
if ! [ -x "$(command -v npm)" ]; then
  print_error "Error: npm is not installed."
  exit 1
fi

# Main update function
update_from_github() {
  print_warning "Updating from GitHub..."
  
  # Check if we're in a git repository
  if [ ! -d ".git" ]; then
    print_error "This is not a git repository. Please run this script from the repository root."
    exit 1
  fi
  
  # Save any uncommitted changes
  if [[ -n $(git status -s) ]]; then
    print_warning "Uncommitted changes detected. Stashing changes..."
    git stash
  fi
  
  # Make sure we're on the main branch
  print_warning "Switching to main branch..."
  git checkout main
  
  if [ $? -ne 0 ]; then
    print_error "Failed to switch to main branch. Please check your repository."
    exit 1
  fi
  
  # Pull the latest changes
  print_warning "Pulling latest changes from GitHub..."
  git pull origin main
  
  if [ $? -ne 0 ]; then
    print_error "Failed to pull from GitHub. Please check your internet connection and GitHub access."
    exit 1
  fi
  
  # Install any new dependencies
  print_warning "Installing dependencies..."
  npm install
  
  if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies. Please check npm and try again."
    exit 1
  fi
  
  print_success "Update completed successfully!"
  print_warning "You can now run the development server with 'npm run dev' to test the changes."
  print_warning "When you push your changes to GitHub, Vercel will automatically deploy them."
}

# Execute the update function
update_from_github
