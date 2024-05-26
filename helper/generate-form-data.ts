const generateFormData = <
  T extends {
    [key: string]: any;
  },
>(
  data: T,
) => {
  const formData = new FormData();
  const keys = Object.keys(data);

  for (const key of keys) {
    const value = data[key];

    // for array
    if (Array.isArray(value) && value.length > 0) {
      if (value[0] instanceof File) {
        for (const file of value) {
          formData.append(key, file);
        }
      } else {
        for (let index = 0; index < value.length; index++) {
          const element = value[index];
          const elementKeys = Object.keys(element);
          for (const elementKey of elementKeys) {
            formData.append(
              `${key}[${index}].${elementKey}`,
              element[elementKey],
            );
          }
        }
      }
      // for primitive data
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};

export default generateFormData;
