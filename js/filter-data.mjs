export const filter_data = [
  {
    key: "gender",
    label: "Gender",
    default: {
      text: "All",
      value: "",
    },
    options: [
      ["Men", "Male"],
      ["Women", "Female"],
    ],
  },
  {
    key: "baseColor",
    label: "Color",
    default: {
      text: "All",
      value: "",
    },
    options: [
      ["Red", "Red"],
      ["Orange", "Orange"],
      ["Green", "Green"],
      ["Yellow", "Yellow"],
      ["Blue", "Blue"],
      ["Purple", "Purple"],
      ["Black", "Black"],
      ["Gray", "Gray"],
    ],
  },
  {
    key: "onSale",
    label: "On sale",
    default: {
      text: "All",
      value: "",
    },
    options: [["On Sale", true]],
  },
];
