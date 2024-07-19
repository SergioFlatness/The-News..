
let newsList=[];
const menus=document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const getLatestNews=async ()=>{
    const url=new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    const response= await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddd",newsList);
};

const getNewsByCategory= async (event)=>{
    const category=event.target.textContent.toLowerCase();
    console.log("category",category);
    const url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd",data);
    newsList=data.articles;
    render();
};


const getNewsByKeyword=async()=>{
    const keyword=document.getElementById("search-input").value;
    console.log("keyword",keyword);
    const url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);
    const response =await fetch(url);
    const data= await response.json();
    console.log("keyword data", data);

    newsList=data.articles;
    render();
};


const render=()=>{
    const newsHTML=newsList.map((news)=>
        ` <div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src= "${news.urlToImage}"/>
            </div>  
        
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${news.description}
                </p>
            <div>
                ${news.source.name} * ${news.publishedAt}
            </div>
            </div>
        </div>`
    ).join("");
  

    document.getElementById("news-board").innerHTML=newsHTML;
};

getLatestNews();    

//버튼들에게 클릭이벤트 부여 c
//카테고리별 뉴스 가져오기 c
//그 뉴스를 보여주기(render)
