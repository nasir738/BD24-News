const loadCatagory = async () => {
  try {
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const datas = await res.json();
    catagoty(datas.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const catagoty = (data) => {
  const navUl = document.getElementById("navbar-menu");
  data.forEach((sData) => {
    const creatElemet = document.createElement("li");
    creatElemet.classList.add("nav-item");
    creatElemet.innerHTML = `
     <a class="ms-4 text-decoration-none" href="#" onclick="loadNews('${sData.category_id}')">${sData.category_name}</a>
    `;
    navUl.appendChild(creatElemet);
  });
};

loadCatagory();

const loadNews = (category_id) => {
    try {
      const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => showNews(data.data));
    } catch (error) {
      console.log(error);
    }
    toggolSpiner(true);

};

const showNews = (data) => {
  const totlaNews = document.getElementById("total-news-item");
  const lent = data.length;
  if (lent === 0) {
    totlaNews.innerText = "news not found";
  } else {
    totlaNews.innerText = `${lent} news find this catagory`;
  }
  const cardParent = document.getElementById("card-parent");
  cardParent.innerHTML = "";

    
    data.sort((a, b) => {
        return b.total_view - a.total_view;
  } )
  data.forEach((news) => {
    const cretcardDiv = document.createElement("div");
    cretcardDiv.classList.add("card");
    cretcardDiv.innerHTML = `
        <div class="card mb-3 p-2 border-0 " data-bs-toggle="modal" data-bs-target="#detailsModal"
    onclick="cardDitails('${news._id}')">
    <div class="row g-0">
        <div class="col-md-3">
            <img src="${
              news.thumbnail_url
            }" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-9">

            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">
                    ${news.details.slice(0, 400) + "..."}
                </p>
            </div>
            <div class="card-footer d-flex bg-white border-0">


                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center" style:""><img
                            class="rounded-circle " style="width:10%;"
                            id="author" src="${news.author.img} alt="" />
                        <div class="p-2">
                            <h4>Name: ${
                              news.author.name
                                ? news.author.name
                                : "no name found"
                            }</h4>
                            <span>Date:${news.author.published_date}</span>
                        </div>
                    </div>
                    <div class="d-flex ">
                        <span class="me-2"><i class="fa-regular fa-eye"></i></span>
                        <span>${
                          news.total_view ? news.total_view : "No view"
                        }</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    cardParent.appendChild(cretcardDiv);
  });
toggolSpiner(false);
};

const cardDitails = (_id) => {
    try {
      const url = `https://openapi.programming-hero.com/api/news/${_id}`;
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => showDitails(data.data[0]));
    } catch (error) {
      console.log(error);
    }
};

const showDitails = (data) => {
  console.log(data);

  const newsModalDetail = document.getElementById("detailsModalLabel");
  newsModalDetail.innerText = data.title;
  const newsModalBody = document.getElementById("modal-body");
  newsModalBody.innerText = data.details;
};

let toggolSpiner = (isLoading) => {
  let toggleSpiner = document.getElementById("spinner");
  if (isLoading === true ) {
    toggleSpiner.classList.remove("d-none");
  } else {
    toggleSpiner.classList.add("d-none");
  }
};

loadNews("01");
