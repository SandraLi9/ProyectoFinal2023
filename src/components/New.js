import React,{useState} from "react";
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Global from '../Global';
 
const New = () =>{
    const url = Global.url;
    const [article, setArticle] = useState({
        title: null,
        content: null,
        autor: null,
    });
    const [redirect, setRedirect] = useState(false);

    //Referencia de los datos del formulario:
    let titleRef = React.createRef();
    let contentRef = React.createRef();
    let autorRef = React.createRef();
    
    const changeState=() => {
        setArticle({
            title: titleRef.current.value,
            content: contentRef.current.value,
            autor: autorRef.current.value,
        });
        console.log(article);
    }
        const sendData = (e)=>{
            //evitamos que al recibir los datos secargue la pantalla:
            e.preventDefault();
            changeState();
            //Petición HTTP por POST para guardar el articulo:
                axios.post(url + 'save',article).then(res =>{
                setRedirect(true);
                console.log(res.data);
            })
        }      
    if(redirect){
        return <Navigate to="Articles" />
    }

    return (
        <div className="nuevaPublicacion">
            <div id="formulario" className="card mx-auto mb3 mt-5" style={{width: '30em'}}>
                <div className="card-header text-dark">
                    <h4>Pubilcar nuevo articulo</h4>
                </div> 
                <div className="card-body">
                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label>Titulo</label>
                            <input type="text" className="form-control" id="title" name="title" ref={titleRef} onChange={changeState} required></input>
                        </div>
                        <div className="mb-3">
                            <label>Content</label>
                            <textarea className="form-control" id="content" name="content" rows={6} cols={30} ref={contentRef} onChange={changeState} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label>Autor</label>
                            <input type="text" className="form-control" id="title" name="title" ref={autorRef} onChange={changeState} required></input>
                        </div>
                        <div className="mb-3">
                            <input className="form-control btn btn-primary" type="submit" id="publish" value="Publicar"></input>
                        </div>
                    </form> 
                
                </div> 
            </div>

        </div>
    );
}
export default New;
