# Car Payment Calculator

A responsive, interactive car payment calculator with a dual-handle circular interface. Calculate monthly payments by adjusting loan amount, APR, and loan term with intuitive circular controls.

## 🚀 Live Demo

**[View Live Calculator](https://praveenswadi.github.io/carpayments/)**

## ✨ Features

- **Dual-Handle Circular Interface**: Interactive dial with separate controls for APR (1-7%) and loan terms (3-6 years)
- **Real-time Calculations**: Monthly payments update instantly as you adjust parameters
- **Loan Amount Slider**: Easy-to-use slider for loan amounts from $10K to $50K
- **Payment Comparison Table**: Side-by-side comparison of all loan terms showing monthly payment, total paid, and total interest
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass-morphism UI**: Modern, professional styling with backdrop blur effects
- **Smooth Animations**: Powered by GSAP for fluid interactions

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with SVG graphics
- **CSS3**: Modern styling with Flexbox, backdrop-filter, and responsive design
- **JavaScript**: Interactive functionality with real-time calculations
- **GSAP 3.13.0**: Animation library for smooth drag interactions
- **jQuery**: DOM manipulation and event handling

## 📱 Interface

### Desktop Layout
- Loan amount slider at the top
- Circular dial with dual handles in the center
- Payment comparison table on the right side

### Mobile Layout
- Loan amount slider at the top
- Circular dial below
- Payment comparison table at the bottom

## 🎯 How to Use

1. **Adjust Loan Amount**: Use the top slider to set your desired loan amount ($10K-$50K)
2. **Set APR**: Drag the right handle around the circle to adjust APR (1-7%)
3. **Choose Loan Term**: Drag the left handle to select loan term (3-6 years)
4. **View Results**: 
   - Center display shows current APR and term with calculated monthly payment
   - Table shows comparison across all loan terms

## 📊 Calculations

The calculator uses the standard loan payment formula:

```
Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)
```

Where:
- **P** = Principal loan amount
- **r** = Monthly interest rate (APR ÷ 12 ÷ 100)
- **n** = Number of payments (loan term in years × 12)

## 🏃‍♂️ Running Locally

1. Clone the repository:
```bash
git clone https://github.com/praveenswadi/carpayments.git
cd carpayments
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using Live Server extension in VS Code
```

3. Navigate to `http://localhost:8000` (or your server's address)

## 🎨 Design Features

- **Circular Dual-Handle Interface**: Intuitive controls positioned at clock positions
- **Real-time Visual Feedback**: Progress arc shows current APR selection
- **Responsive Typography**: Font sizes adjust for different screen sizes
- **Hover Effects**: Interactive elements respond to user interaction
- **Professional Color Scheme**: Teal and white color palette with transparency effects

## 🙏 Attribution

This project was built upon the excellent foundation created by **Pete Barr** from his CodePen:
**[@petebarr - Hand Hygiene Savings Calculator](https://codepen.io/petebarr/pen/rmOJQW)**

Big thanks to Pete Barr for the original circular dial implementation and inspiration! 🙌

## 📈 Development Journey

The project evolved from a simple savings calculator to a comprehensive car payment tool with:
- Dual-handle interface for APR and loan terms
- Real-time payment calculations
- Responsive design for all devices
- Professional styling with glass-morphism effects
- Payment comparison table
- Optimized user experience

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for better financial decision-making** 