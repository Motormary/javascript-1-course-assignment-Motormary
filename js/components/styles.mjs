export const cardStyle = `
.card {
  position: relative;
  max-width: 300px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 25rem;
  padding: 1rem 3rem;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}
.border-hover:hover {
  border-color: #3864bb;
  scale: 1.01
}
.add-quantity, .sub-quantity {
  font-size: 1rem;
}
.card > * {
  margin: 0.25rem;
}
.image {
  width: auto;
  max-height: 250px;
  max-width: 250px;
  object-fit: contain;
  border-radius: 4px;
}
button.add_btn {
  // font-family: cursive;
  padding: 0.5rem;
  background-color: #164196;
  box-shadow: none;
  outline: none;
  border: solid 1px;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  }
  button.add_btn:hover {
    background-color: #3864bb;
  }
  button.add_btn:focus {
    background-color: #3864bb;
  }
.onsale {
  position: absolute;
  top: 0px;
  right: -40px;
  font-size: 26px;
  font-family: "helvetica";
  font-weight: bold;
  color: green;
  transform: rotate(30deg);
  z-index: 1;
}
.bg-green {
  color: white;
  background-color: green;
}
.hover:hover {
  cursor: pointer;
}
`;

export const cardCartStyle = `
.card {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  margin: 0.5rem 0;
}
.add-quantity, .sub-quantity {
  font-size: 1rem;
}
.card > * {
  flex: 1;
}
.image {
  width: auto;
  max-height: 100px;
  object-fit: contain;
  border-radius: 4px;
}
.onsale {
  font-family: "helvetica";
  font-weight: bold;
  color: green;
}
button.add_btn {
  background-color: #164196;
  color: #fff;
}
.hover:hover {
  cursor: pointer;
}
.description {
  display: none;
}
.sizes {
  display: none;
}
`;

export const cardRadioStyle = `
.radio-grp {
  display: flex;
  gap: 5px;
  justify-content: center;
}

input[type="radio"] {
  display:none;
}

label {
  width: 43px;
  display: inline-block;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
}

.blank-label {
  display: none;
}

input[type="radio"]:checked + label {
  background: #164196;
  color: #fff;
}
`;

export const quantityStyle = `
.quantity-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  user-select: none;
}
input, #quantity {
  height: fit-content;
  width: 25px;
  text-align: center;
  -webkit-text-align: center;
  -moz-text-align: center;
  -webkit-appearance: textfield; 
  -moz-appearance: textfield;
  margin: 0; 
  user-select: none;
}

/* Remove Chrome spinner */
input, #quantity::-webkit-inner-spin-button, 
input, #quantity::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input, #quantity:hover {
  cursor: default;
}
input, #quantity:focus-within {
  outline: none;
}
.quantity-container > button {
  background-color: transparent;
  padding: 0 0.5rem;
  border: none;
}
.quantity-container > button:hover {
  cursor: pointer;
}
`;

export const navStyle = `
.nav-content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 5rem;
  width: 100%;
  padding: 0 3rem;
  gap: 1rem;
  align-items: center;
  justify-content: right;
  background-color: #164196;
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
  font-size: 20px;
}
.floater {
  position: absolute;
  top: calc(1.9rem - 12px);
  right: calc(2.2rem - 12px);
  display: flex;
  align-items: baseline;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: red;
  color: white;
  aspect-ratio: 1/1;
}
`;
