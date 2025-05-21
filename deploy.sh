#!/bin/bash
# Manual deployment script for the portfolio website to Vercel
# Note: This script is only needed if you want to manually deploy
# without pushing to GitHub. Normally, Vercel will automatically 
# deploy when you push changes to your GitHub repository.

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

print_warning "Starting manual deployment to Vercel..."
print_warning "Note: This is only needed if you don't want to push to GitHub."
print_warning "Normally, pushing to GitHub will trigger automatic deployment."
echo ""

# Check if npm is installed
if ! [ -x "$(command -v npm)" ]; then
  print_error "Error: npm is not installed."
  exit 1
fi

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
    
    # Navigate to build directory
    cd $BUILD_DIR || {
        print_error "Failed to navigate to build directory: $BUILD_DIR"
        exit 1
    }
    
    # Create .nojekyll file (prevents GitHub Pages from ignoring files that begin with an underscore)
    touch .nojekyll
    
    # Initialize Git and add all files
    git init
    git add -A
    git commit -m "Deploy to GitHub Pages"
    
    # Force push to the gh-pages branch of the repository
    print_warning "Pushing to GitHub Pages branch..."
    git push -f git@github.com:$GITHUB_USERNAME/$REPO_NAME.git main:gh-pages
    
    if [ $? -ne 0 ]; then
        print_error "Failed to push to GitHub Pages. Please check your GitHub access and try again."
        cd ..
        exit 1
    fi
    
    print_success "Deployed successfully to GitHub Pages!"
    print_success "Visit: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
    
    # Return to project root
    cd ..
}

# Function to deploy to Vercel
deploy_to_vercel() {
    print_warning "Starting deployment to Vercel..."
    
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
}

# Main menu
echo "========================================="
echo "      Portfolio Website Deployment       "
echo "========================================="
echo "1. Deploy to Vercel (recommended)"
echo "2. Deploy to GitHub Pages (legacy)"
echo "3. Exit"
echo "========================================="
read -p "Choose an option (1-3): " choice

case $choice in
    1)
        deploy_to_vercel
        ;;
    2)
        print_warning "Note: The site is configured for Vercel deployment."
        read -p "Are you sure you want to deploy to GitHub Pages? (y/n): " confirm
        if [[ $confirm == [Yy]* ]]; then
            deploy_to_github_pages
        else
            print_warning "Deployment canceled."
        fi
        ;;
    3)
        print_warning "Exiting deployment script."
        exit 0
        ;;
    *)
        print_error "Invalid option. Exiting."
        exit 1
        ;;
esac
