export default function (data) {
  const { orderObj } = data;
  let form = document.createElement("form");
  form.action = "https://securegw-stage.paytm.in/theia/processTransaction";
  form.method = "POST";
  Object.keys(orderObj).forEach((key) => {
    const i = document.createElement("input");
    i.type = "hidden";
    i.name = key;
    i.value = orderObj[key];
    form.appendChild(i);
  });
  document.body.appendChild(form);
  form.submit();
}
