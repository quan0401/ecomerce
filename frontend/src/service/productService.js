import instance from "../axios/setup";
import Compressor from "compressorjs";

const generateFiltersUrl = (filters) => {
  const keys = Object.keys(filters);
  const url = keys.reduce((accUrl, key) => {
    if (key === "price") {
      if (filters[key] !== null) {
        accUrl += `&price=${filters[key]}`;
      }
    } else if (key === "rating") {
      // {1: true, 2: true}
      let urlRating = "";
      let existTrue = false;
      Object.keys(filters[key]).forEach((innerKey, index) => {
        if (filters[key][innerKey]) {
          if (existTrue === false) {
            urlRating += `&${key}=${innerKey}`;
            existTrue = true;
          } else urlRating += `,${innerKey}`;
        }
      });
      accUrl += urlRating;
    } else if (key === "category") {
      // ['Books', 'Laptop']
      let urlCategory = "";
      if (filters[key].length > 0) {
        filters[key].forEach((item, index) => {
          if (index === 0) {
            urlCategory = `&${key}=${item}`;
          } else urlCategory += `,${item}`;
        });
      }
      accUrl += urlCategory;
    } else if (key === "attributes") {
      // [ { key: "Processor", value: ["a", "b"] } ]
      let urlAttributes = "";

      if (filters[key].length > 0) {
        filters[key].forEach((item, index) => {
          if (index === 0) {
            // to access "Processor"
            const key1 = item["key"];

            urlAttributes = `&${key}=${key1}`;
            filters[key][index]["value"].forEach((item1) => {
              urlAttributes += `-${item1}`;
            });
          } else {
            // to access "Processor"
            const key1 = item["key"];

            urlAttributes += `,${key1}`;
            filters[key][index]["value"].forEach((item1) => {
              urlAttributes += `-${item1}`;
            });
          }
        });
      }

      accUrl += urlAttributes;
    }
    return accUrl;
  }, "");
  return url;
};

export const getProductsApi = async (
  abortController,
  pageNumParam = null,
  categoryName = "",
  searchQuery = "",
  sortOption = "",
  filters = {}
) => {
  // filtersUrl = "&price=60&rating=1,2,3&category=a,b,c,d&attributes=color-red-blue,size-1TB-2TB";
  const signal = abortController ? abortController.signal : null;
  const category = categoryName ? `/category/${categoryName}/` : "";
  const search = searchQuery ? `/search/${searchQuery}/` : "";
  const filtersUrl = generateFiltersUrl(filters);

  const url = `/api/products${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`;

  return await instance.get(url, { signal: signal });
};

export const getProductsAdmin = async (abortController) => {
  return await instance.get("/api/products/admin", {
    signal: abortController.signal,
  });
};

export const deleteProductAdmin = async (productId) =>
  await instance.delete("/api/products/admin/" + productId);

export const getProductByIdApi = async (productId, abortController) => {
  const signal = abortController ? abortController.signal : null;
  return await instance.get("/api/products/get-one/" + productId, {
    signal: signal,
  });
};

export const updateProductApi = async (productId, productData) =>
  await instance.put("/api/products/admin/" + productId, { ...productData });

export const deleteProductImage = async (productId, imagePath) => {
  if (process.env.NODE_ENV === "production") {
    return await instance.delete(
      `/api/products/admin/image/${encodeURIComponent(imagePath)}/${productId}`
    );
  } else {
    return await instance.delete(
      `/api/products/admin/image/${encodeURIComponent(
        imagePath
      )}/${productId}?cloudinary=true`
    );
  }
};

// export const uploadImageApi = async (images, productId) => {
//   if (process.env.NODE_ENV === "production") {
//     //to do change to !==
//     const formData = new FormData();

//     Array.from(images).forEach((img) => {
//       formData.append("images", img);
//     });

//     return await instance.post(
//       "/api/products/admin/upload?productId=" + productId,
//       formData
//     );
//   } else {
//     const cloudName = "dg3fsapzu";

//     const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//     const formData = new FormData();

//     for (let i = 0; i < images.length; i++) {
//       let file = images[i];

//       formData.append("file", file);

//       formData.append("upload_preset", "gvrttlre");

//       let uploadedProductData;

//       await fetch(url, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           uploadedProductData = data;
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       await instance.post(
//         "/api/products/admin/upload?cloudinary=true&productId=" + productId,
//         { imageUrl: uploadedProductData.url }
//       );
//     }
//   }
// };

export const uploadImageApi = async (images, productId) => {
  if (process.env.NODE_ENV === "production") {
    //to do change to !==
    const formData = new FormData();

    Array.from(images).forEach((img) => {
      formData.append("images", img);
    });

    return await instance.post(
      "/api/products/admin/upload?productId=" + productId,
      formData
    );
  } else {
    const cloudName = "dg3fsapzu";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    for (let i = 0; i < images.length; i++) {
      let file = images[i];

      const compressFile = await new Promise((resolve) => {
        new Compressor(file, {
          quality: 0.9,

          // The compression process is asynchronous,
          // which means you have to access the `result` in the `success` hook function.
          success(result) {
            resolve(result);

            // The third parameter is required for server
          },
          error(err) {
            console.log(err.message);
            resolve(file);
          },
        });
      });

      const formData = new FormData();
      formData.append("file", compressFile);
      formData.append("upload_preset", "gvrttlre");
      // Send the compressed image file to server with XMLHttpRequest.
      let uploadedProductData;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          uploadedProductData = data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (uploadedProductData)
        await instance.post(
          "/api/products/admin/upload?cloudinary=true&productId=" + productId,
          { imageUrl: uploadedProductData.url }
        );
    }
  }
};

export const createProductApi = async (productData) =>
  await instance.post("/api/products/admin", { ...productData });

export const getBestsellerApi = async () => {
  return await instance.get("/api/products/bestseller");
};
