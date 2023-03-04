// Fetching Data From Api
const fetchData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const resp = await fetch(url);
  const data = await resp.json();
  displayData(data.data.tools);
};

const displayData = (datas) => {
  datas.forEach((singleData) => {
    const cardContainer = document.getElementById("cardContainer");
    const { image, features, name, published_in, id } = singleData;
    // Create features list
    const createLi = (featuresList) => {
      let singleLi = "";
      featuresList.forEach((list) => {
        singleLi += `<li>${list}</li>`;
      });
      return singleLi;
    };
    // Date convert
    function formatDate(dateString) {
      let parts = dateString.split("/");
      let month = parts[0];
      let day = parts[1];
      let year = parts[2];
      if (day.length === 1) {
        day = "0" + day;
      }
      return month + "/" + day + "/" + year;
    }

    cardContainer.innerHTML += `
    <div class="card-body border p-6 rounded-2xl">
        <figure class="">
            <img src="${image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="">
            <h2 class="font-semibold text-black text-2xl mt-3 mb-2">Features</h2>
            <ol class="list-decimal ml-6 color-primary space-y-1.5">
            ${createLi(features)}
            </ol>
            <hr class="border-t my-5">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="font-semibold text-black text-2xl mb-3">${name}</h3>
                    <p class="color-primary"><img class="inline mr-2" src="./icon/date.png"/>${formatDate(
                      published_in
                    )}</p>
                </div>
                <div >
                   <label onclick="openModal('${id}')" for="my-modal-3" class="cursor-pointer"><img src="./icon/right-arrow.png"/></label>
                </div>
            </div>
        </div>    
    </div>
    `;
  });
};

// Modal Data
const openModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  displayModalData(data.data);
};

const displayModalData = (data) => {
  console.log(data);
  const detailsCardModal = document.getElementById("cardModal");
  const {
    description,
    pricing,
    features,
    integrations,
    image_link,
    input_output_examples,
    accuracy,
  } = data;
  //   Create modal features list
  const createIntLi = (integrationsList) => {
    let singleLi = "";
    integrationsList.forEach((list) => {
      if (list === null || list === "") {
        list.innerHTML = "No Data";
      }
      singleLi += `<li class="color-primary">${list}</li>`;
    });
    return singleLi;
  };

  // accuracy
  /*   const accuracyBox = (accuracyText) => {
    if (accuracyText.score) {
      accuracyText.score;
    } else if (accuracyText.score === null) {
      document
        .getElementById("accuracy-text")
        .classList.remove("badge", "badge-primary");
    }
  }; */

  detailsCardModal.innerHTML = `
    <label
    for="my-modal-3"
    class="btn btn-sm btn-circle absolute right-2 top-2"
    >✕</label>

    <div class="grid md:grid-cols-2 gap-5">
        <div class="border p-6 bg-neutral-100 rounded-2xl border-green-500">
            <h4 class="text-2xl text-black font-bold mb-6">
                ${description ? description : "Not Available"}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white rounded-2xl text-center p-6 text-red-500 font-bold">
                    <p> ${pricing[0].price ? pricing[0].price : "Free of"} ${
    pricing[0].plan ? pricing[0].plan : "Cost/Basic"
  }</p>
                </div>
                 <div class="bg-white rounded-2xl text-center p-6 text-orange-500 font-bold">
                    <p>${pricing[1].price ? pricing[1].price : "Free Of"} ${
    pricing[1].plan ? pricing[1].plan : "Cost/Pro"
  }</p>
                </div>
                 <div class="bg-white rounded-2xl text-center p-6 text-green-500 font-bold">
                    <p>${
                      pricing[2].price
                        ? pricing[2].price.slice(0, 10)
                        : "Free of"
                    } ${
    pricing[2].plan ? pricing[2].plan : "Cost /Enterprise"
  }</p>
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <h4 class="text-2xl text-black font-bold mb-4">Features</h4>
                    <ul class="list-disc ml-6 space-y-1.5">
                        <li class="color-primary">${
                          features ? features[1].feature_name : "No data Found"
                        }</li>
                        <li class="color-primary">${
                          features ? features[2].feature_name : "No data Found"
                        }</li>
                        <li class="color-primary">${
                          features ? features[3].feature_name : "No data Found"
                        }</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-2xl text-black font-bold mb-4">Integrations</h4>
                    <ul class="list-disc ml-6 space-y-1.5">
                        ${createIntLi(integrations)}
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body border p-6 rounded-2xl">
            <figure class="relative">
                <img src="${
                  image_link ? image_link[0] : image_link[1]
                }" alt="Shoes" class="rounded-xl" />
                <div id="accuracy-text" class="bg-red-500 badge badge-primary absolute top-3 right-3 border-none rounded-md p-3">
                 ${accuracy ? accuracy.score * 100 : ""}% accuracy
                </div>
            </figure>
            <div class="text-center px-12">
                <h2 class="font-semibold text-black text-2xl mt-3 mb-2">${
                  input_output_examples
                    ? input_output_examples[0].input
                    : "No! Not Yet Taken."
                }</h2>
                <p class="mt-4">${
                  input_output_examples
                    ? input_output_examples[0].output
                    : "No! Not Yet Taken."
                }</p>
            </div>    
    </div>
    </div>

  `;
};
// Show More Data Click to Show More Button
/* const showMore = () => {}; */
// git commit korte hobe

/* <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-3"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">
        Congratulations random Internet user!
      </h3>
      <p class="py-4">
        You've been selected for a chance to get one year of subscription
        to use Wikipedia for free!
      </p>
    </div>
  </div> */

/*  <li class="color-primary">${integrations[0]}</li>
                        <li class="color-primary">${integrations[1]}</li>
                        <li class="color-primary">${integrations[2]}</li> */
