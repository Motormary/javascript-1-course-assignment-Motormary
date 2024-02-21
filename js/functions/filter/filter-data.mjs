/**
 * @description - For every object a filter button will be generated.
 * key = key to filter
 * value = value to filter.
 */

export const filter_data = [
  {
    key: "gender",
    label: "Gender",
    default: {
      text: "All",
      value: "",
    },
    options: [
      {
        label: "Men",
        value: "Male",
      },
      {
        label: "Women",
        value: "Female",
      },
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
      {
        label: "Red",
        value: "Red",
      },
      {
        label: "Orange",
        value: "Orange",
      },
      {
        label: "Green",
        value: "Green",
      },
      {
        label: "Yellow",
        value: "Yellow",
      },
      {
        label: "Blue",
        value: "Blue",
      },
      {
        label: "Purple",
        value: "Purple",
      },
      {
        label: "Black",
        value: "Black",
      },
      {
        label: "Gray",
        value: "Gray",
      },
    ],
  },
  {
    key: "onSale",
    label: "Discount",
    default: {
      text: "All",
      value: "",
    },
    options: [
      {
        label: "On Sale",
        value: true,
      },
    ],
  },
];
