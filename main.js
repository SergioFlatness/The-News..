
let newsList=[];
const menus=document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
let url=new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines `);

let totalResults=0;
let page=1;
const pagesize=10;
const groupsize=5;

const getNews=async()=>{
    try{
        url.searchParams.set("page",page)  // =>&page=page
        url.searchParams.set("pagesize", pagesize);
        const response= await fetch(url);
        const data = await response.json();
        if(response.status===200){
            if(data.articles.length===0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResult=data.totalResults;
            render();
            paginationRender();
        }else{
            throw new Error(data.message);
        }




     } catch (error){
        
        errorRender(error.message)
     }
};

const getLatestNews=async ()=>{
    url=new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);

    getNews();
   
};



const getNewsByCategory= async (event)=>{
    const category=event.target.textContent.toLowerCase();
    console.log("category",category);
    url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);

    getNews();
    
};


const getNewsByKeyword=async()=>{
    const keyword=document.getElementById("search-input").value;
    console.log("keyword",keyword);
    url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);

    getNews();
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


const errorRender=(errorMessage)=>{
    const errorHTML=`<div class="alert alert-danger" role="alert">
  ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML=errorHTML
};

const paginationRender=()=>{
    const totalPages=Math.ceil(totalResults.pagesize);

    const pageGroup=Math.ceil(page/groupsize);
    const lastPage=pageGroup*groupsize;
    if(lastPage> totalPages){
        lastPage=totalPages;
    }
    const firstPage=lastPage-(groupsize-1)<=0? 1:lastPage-(groupsize-1);

    let paginationHTML=`<li class="page-item" onclick="moveTopage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;
    

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`<li class="page-item ${
            i===page ? "active" : ""
        }" onclick="moveTopage(${i})"><a class="page-link">${i}</a></li>`
    }
    paginationHTML+=`<li class="page-item" onclick="moveTopage(${page+1})"><a class="page-link" href="#">Next</a></li>`;
    document.querySelector(".pagination").innerHTML=paginationHTML




    // <nav aria-label="Page navigation example">
    // <ul class="pagination">
    //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //     <li class="page-item"><a class="page-link" href="#">1</a></li>
    //     <li class="page-item"><a class="page-link" href="#">2</a></li>
    //     <li class="page-item"><a class="page-link" href="#">3</a></li>
    //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
    // </ul>
    // </nav>




};

const moveTopage=(pageNum)=>{
    console.log('move', pageNum);
    page=pageNum;
    getNews();
};






getLatestNews();    

//버튼들에게 클릭이벤트 부여 c
//카테고리별 뉴스 가져오기 c
//그 뉴스를 보여주기(render) c
