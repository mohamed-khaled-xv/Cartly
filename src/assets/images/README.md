# Welcome Hero Image

Place your hero image here as `welcome-hero.jpg`

The image should be:

- **Dimensions**: Recommended 375x600px or similar aspect ratio
- **Format**: JPG or PNG
- **Content**: A woman shopping with groceries (as shown in Figma)
- **Quality**: High resolution for crisp display on mobile devices

## Alternative Approach

If you don't have the exact image, you can:

1. **Use a stock photo** from sources like:

   - Unsplash
   - Pexels
   - Shutterstock

2. **Search for**: "woman shopping groceries smartphone cart produce"

3. **Replace the ImageBackground source** in `Welcome.tsx`:
   ```tsx
   source={require('../assets/images/welcome-hero.jpg')}
   ```

## Temporary Solution

For now, the app will show an error until you add the image. You can:

- Add any grocery shopping image with this filename
- Or use a placeholder URL from the internet
- Or temporarily comment out the ImageBackground component
