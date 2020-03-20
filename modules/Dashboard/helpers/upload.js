import config from "config/env";

export const getPresignedPostData = async selectedFile => {
  return await fetch(`${config.apiGatewayUrl}/getpresignedpostdata`, {
    method: "POST",
    "Content-Type": "application/json;charset=UTF-8",
    body: JSON.stringify({
      name: selectedFile.name,
      type: selectedFile.type
    })
  }).then(res => res.json());
};

export const uploadFileToS3 = async (presignedPostData, file) => {
  const formData = new FormData();
  Object.keys(presignedPostData.fields).forEach(key => {
    formData.append(key, presignedPostData.fields[key]);
  });

  // Actual file has to be appended last.
  formData.append("file", file);
  return await fetch(presignedPostData.url, {
    method: "POST",
    body: formData
  })
};
