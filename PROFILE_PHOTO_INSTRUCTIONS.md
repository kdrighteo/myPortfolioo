# Adding Your Profile Photo to the Portfolio

## Instructions for Gilbert Danso

1. **Save your profile photo**:

   - Take the profile photo you shared (the one with you in a black hoodie)
   - Save it as `profile.jpg` in the `/public/images/` directory
   - The optimum size is approximately 600x800px for best quality

2. **File Location**:

   ```
   /Users/kdbf/Desktop/portfolio/public/images/profile.jpg
   ```

3. **Image Component**:
   We've already created a specialized `ProfileImage` component that handles:

   - Responsive sizing
   - Image optimization
   - Proper loading states
   - Accessibility

4. **Image is Referenced In**:

   - Home page (`src/app/page.tsx`)
   - About page (`src/app/about/page.tsx`)

5. **Customizing Image Display**:
   If you need to adjust how your photo appears:
   - For cropping focus: Edit the `className` in the ProfileImage component
   - For quality settings: Adjust the `quality` parameter (default: 90)
   - For different sizing: Modify the `containerClassName` when using the component

## Why This Approach Works Well

- **Performance**: Next.js Image component automatically optimizes delivery
- **Accessibility**: Proper alt text ensures screen reader compatibility
- **User Experience**: Progressive loading with blur effect creates a smooth experience
- **Maintainability**: Single source of truth for your profile image

Once you add your photo to the specified location, it will automatically appear in all places throughout the site where the ProfileImage component is used.
