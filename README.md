# Bubble Sort Visualizer

A modern, interactive Bubble Sort visualizer built with React, Vite, and Tailwind CSS.

## Features
- Step-by-step visualization of Bubble Sort algorithm
- Supports both ascending and descending order
- Switch between "Bars" and "Bubbles" view modes
- Custom array input and randomization
- Adjustable sorting speed
- Displays comparisons and swaps count
- Responsive and clean UI

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
1. Clone the repository or download the source code.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Usage
- **Array Input:** Enter a comma-separated list of numbers and click "Apply" to visualize sorting that array.
- **Randomize:** Click "Randomize" to generate a new random array of the same length.
- **Speed:** Adjust the slider to change the sorting speed.
- **View Mode:** Toggle between "Bars" and "Bubbles" for different visual styles.
- **Order:** Choose "Ascending" or "Descending" to change the sorting direction.
- **Controls:**
  - **Start:** Begin the sorting animation.
  - **Pause:** Pause the animation.
  - **Reset:** Reset the array and stats.
  - **Step Back/Step:** (if implemented) Step through the algorithm manually.
- **Stats:** See the number of comparisons and swaps performed.

## Project Structure
```
├── src/
│   ├── components/
│   │   ├── BubbleSortVisualizer.jsx
│   │   ├── ControlPanel.jsx
│   │   └── SortVisualizer.jsx
│   └── ...
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization
- You can change the array size, colors, and UI styles by editing the relevant components and Tailwind classes.

## License
MIT

---
Made with ❤️ using React, Vite, and Tailwind CSS.