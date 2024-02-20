export const cardStyle = `
.card {
  position: relative;
  min-width: 245px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 35rem;
  background-color: #fff;
  padding: 1rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}
.card > * {
  margin: 0;
}
.image {
  width: auto;
  max-height: 250px;
  object-fit: contain;
  border-radius: 4px;
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
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  margin: 0.5rem 0;
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
.bg-green {
  color: white;
  background-color: green;
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
  background: green;
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
  box-sizing: border-box;
  display: flex;
  height: 5rem;
  width: 100%;
  padding: 0 3rem;
  gap: 1rem;
  align-items: center;
  justify-content: right;
  background-color: green;
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
  font-size: 20px;
}`;
