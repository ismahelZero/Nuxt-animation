export default defineAppConfig({
  icon: {
    customize: (
      content: string,
      name: string,
      prefix: string,
      provider: string
    ) => {
      if (prefix !== 'solar') return content // Ignore Prefix

      return content.replace(/stroke-width="[^"]*"/g, `stroke-width="1.5"`) // Change stroke width to 2
      // .replace(/stroke="[^"]*"/g, `stroke="#FF5733"`) // Change stroke color to red
      // .replace(/fill="[^"]*"/g, `fill="#FF5733"`) // Change fill color to red
      // .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`) // Change animation duration to 1s (for animated icons)
      // .replace(/opacity="[^"]*"/g, `opacity="0.8"`);// Change opacity to 0.8
    }
  }
})
