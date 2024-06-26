export default {
    path: '/',
    title: "Foo",
    version: "1.0.0",
    tagIndex: 2,
    ignore: ["/swagger", "/docs"],
    preferredPutPatch: "PUT", // if PUT/PATCH are provided for the same rout, prefer PUT
    common: {
      parameters: {}, // OpenAPI conform parameters that are commonly used
      headers: {}, // OpenAPI confomr headers that are commonly used
    },
    dirs: [], // Add your directories here
    snakeCase: false // Specify your snakeCase preference
};
