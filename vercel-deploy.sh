#!/bin/bash
# Script to update and deploy the portfolio website to Vercel

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
update_and_deploy() {
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
  
  # Ask if user wants to deploy
  read -p "Do you want to deploy to Vercel now? (y/n): " deploy_choice
  
  if [[ $deploy_choice == [Yy]* ]]; then
    # Install Vercel CLI locally if not in node_modules
    if [ ! -d "node_modules/vercel" ]; then
        print_warning "Vercel CLI not found in local dependencies. Installing locally..."
        npm install --save-dev vercel
        
        if [ $? -ne 0 ]; then
            print_error "Failed to install Vercel CLI. Please check npm permissions and try again."
            exit 1
        fi
    fi
    
    # Check if user is logged in to Vercel, if not prompt to login
    print_warning "Checking Vercel authentication..."
    npx vercel whoami &>/dev/null
    
    if [ $? -ne 0 ]; then
        print_warning "You are not logged in to Vercel. Please log in now:"
        npx vercel login
        
        if [ $? -ne 0 ]; then
            print_error "Failed to log in to Vercel. Please try again."
            exit 1
        fi
    fi
    
    # Deploy to Vercel (production) using local installation
    print_warning "Deploying to Vercel..."
    npx vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "Deployed successfully to Vercel!"
    else
        print_error "Deployment to Vercel failed. Please check the error messages above."
        exit 1
    fi
  else
    print_warning "Deployment skipped. You can run './deploy.sh' later to deploy."
  fi
}

# Execute the update function
update_and_deploy
