# Git Commands Quick Reference

## Initial Setup (One Time)

```bash
# Configure Git
git config --global user.name "Pranay Vilas Gourkar"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

## First Commit

```bash
# Initialize repository
git init

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/Pratikkk0566/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Daily Workflow

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Updated projects section"

# Push to GitHub
git push
```

## Useful Commands

```bash
# View commit history
git log --oneline

# See differences
git diff

# Undo changes (before commit)
git checkout -- filename

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name
```

## Common Scenarios

### Made changes, want to commit

```bash
git add .
git commit -m "Describe your changes"
git push
```

### Want to undo last commit (not pushed)

```bash
git reset --soft HEAD~1
```

### Forgot to add files to last commit

```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

### Pull latest before pushing

```bash
git pull origin main
git push origin main
```

## Commit Message Tips

Good messages:
- ✅ "Add contact form validation"
- ✅ "Fix navigation menu on mobile"
- ✅ "Update project descriptions"
- ✅ "Add new achievement section"

Bad messages:
- ❌ "Update"
- ❌ "Fix stuff"
- ❌ "Changes"

## Troubleshooting

### "Permission denied"
Use HTTPS URL:
```bash
git remote set-url origin https://github.com/Pratikkk0566/portfolio.git
```

### "Updates were rejected"
Pull first:
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### "Not a git repository"
Initialize:
```bash
git init
```

---

For full setup guide, see [SETUP.md](./SETUP.md)
