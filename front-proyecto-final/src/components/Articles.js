import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Global from '../Global';
import Article from './Article';

const Articles = () => {
    
    const [Articles,setArticles] = useState([]);
    const url = Global.url;

    useEffect(() => {
        getArticles();
        console.log(Articles);  
    },[Articles.length,setArticles]);

    //obtener todos los Articulos
    const getArticles = () => {
        axios.get(url + 'Articles').then(res => {
            setArticles(res.data.Articles);
        })
    } 
//eliminamos un Articulo a travezde su ID
    const delArticles = (id) => {
        const idArticle = Article[id]._id;
        axios.delete(url + 'articles/' + idArticle).then(res => {
            getArticles();
        })
    }
          
    return(
        <div className='Publicaciones'>
            <h1 className='mt-5'>Articulos</h1>
            <div className='container mt-3'>
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2'>
                    {
                        Articles.length > 0 ? (
                            Articles.map((article, i) =>{
                                return(
                                    <Article 
                                        key={i} 
                                        id={article._id}
                                        articleData={article} 
                                        delArticle={getArticles}
                                        />
                                     );       
                            })  
                        ):(
                            <h3 className='mx-auto'>No hay Articulos</h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Articles;