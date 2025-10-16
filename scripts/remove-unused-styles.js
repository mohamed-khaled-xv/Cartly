#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

/**
 * Script to automatically remove unused styles from React Native files
 * This works by parsing ESLint output and removing unused style definitions
 */

function removeUnusedStyles(filePath) {
  try {
    // Run ESLint to get unused styles
    const eslintOutput = execSync(
      `npx eslint "${filePath}" --format=json --no-eslintrc --config=.eslintrc.js`,
      {encoding: 'utf-8', stdio: 'pipe'},
    );

    const eslintResults = JSON.parse(eslintOutput);
    if (!eslintResults[0] || !eslintResults[0].messages) {
      console.log(`✓ No unused styles found in ${filePath}`);
      return;
    }

    const unusedStyles = eslintResults[0].messages
      .filter(msg => msg.ruleId === 'react-native/no-unused-styles')
      .map(msg => {
        const match = msg.message.match(/Unused style detected: styles\.(\w+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    if (unusedStyles.length === 0) {
      console.log(`✓ No unused styles found in ${filePath}`);
      return;
    }

    console.log(
      `🧹 Found ${unusedStyles.length} unused styles in ${filePath}:`,
    );
    unusedStyles.forEach(style => console.log(`  - ${style}`));

    // Read the file content
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove unused styles from StyleSheet.create
    unusedStyles.forEach(styleName => {
      // Match the style definition with proper indentation and comma handling
      const styleRegex = new RegExp(
        `\\s*${styleName}:\\s*\\{[^}]*\\},?\\s*\\n?`,
        'g',
      );
      content = content.replace(styleRegex, '');
    });

    // Clean up any trailing commas in StyleSheet.create
    content = content.replace(/,(\s*})\s*\)\s*;/g, '$1);');

    // Write the cleaned content back
    fs.writeFileSync(filePath, content, 'utf-8');

    console.log(
      `✅ Removed ${unusedStyles.length} unused styles from ${filePath}`,
    );
  } catch (error) {
    if (error.status === 1) {
      // ESLint found issues, which is expected
      try {
        const eslintResults = JSON.parse(error.stdout);
        const unusedStyles =
          eslintResults[0]?.messages
            ?.filter(msg => msg.ruleId === 'react-native/no-unused-styles')
            ?.map(msg => {
              const match = msg.message.match(
                /Unused style detected: styles\.(\w+)/,
              );
              return match ? match[1] : null;
            })
            ?.filter(Boolean) || [];

        if (unusedStyles.length > 0) {
          console.log(
            `🧹 Found ${unusedStyles.length} unused styles in ${filePath}:`,
          );
          unusedStyles.forEach(style => console.log(`  - ${style}`));

          let content = fs.readFileSync(filePath, 'utf-8');

          unusedStyles.forEach(styleName => {
            // More comprehensive regex to match style definitions
            const patterns = [
              // Multi-line style definition
              new RegExp(`\\s*${styleName}:\\s*\\{[\\s\\S]*?\\},?\\s*`, 'g'),
              // Single line style definition
              new RegExp(`\\s*${styleName}:\\s*\\{[^}]*\\},?\\s*`, 'g'),
            ];

            patterns.forEach(pattern => {
              content = content.replace(pattern, '');
            });
          });

          // Clean up StyleSheet formatting
          content = content.replace(/,(\s*})\s*\)\s*;/g, '$1);');
          content = content.replace(/{\s*,/g, '{');
          content = content.replace(/,\s*,/g, ',');

          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(
            `✅ Removed ${unusedStyles.length} unused styles from ${filePath}`,
          );
        }
      } catch (parseError) {
        console.error(`❌ Error processing ${filePath}:`, parseError.message);
      }
    } else {
      console.error(`❌ Error running ESLint on ${filePath}:`, error.message);
    }
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir, {withFileTypes: true});

  files.forEach(file => {
    const fullPath = path.join(dir, file.name);

    if (
      file.isDirectory() &&
      !file.name.startsWith('.') &&
      file.name !== 'node_modules'
    ) {
      processDirectory(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      removeUnusedStyles(fullPath);
    }
  });
}

// Main execution
const targetPath = process.argv[2] || './src';

if (fs.statSync(targetPath).isDirectory()) {
  console.log(`🚀 Scanning directory: ${targetPath}`);
  processDirectory(targetPath);
} else {
  console.log(`🚀 Processing file: ${targetPath}`);
  removeUnusedStyles(targetPath);
}

console.log('🎉 Unused style cleanup completed!');
