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
