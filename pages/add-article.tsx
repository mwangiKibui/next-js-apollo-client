import React,{useState} from 'react';
import {useMutation,gql} from "@apollo/client";
import Link from "next/link"

export default function AddArticle() {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [form_error,setFormError] = useState("");
    const [success_message,setSuccessMessage] = useState("");

    // create a graphql mutation query
    const ADD_ARTICLE = gql`
    mutation createArticle($title: String, $content: String, $summary: String) {
    createArticle(title: $title,content: $content,summary: $summary) {
        content
        summary
        title
    }
    }`; 

    // instanciate useMutation
    const [addArticle,{loading,data,error}] = useMutation(ADD_ARTICLE);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // reset error and success message fields.
        setSuccessMessage("");
        setFormError("");

        // check the fields.
        if(title && summary && content){

            addArticle({variables:{
                title,
                summary,
                content
            }}).then( () => {
                //release state
                setTitle("");
                setSummary("");
                setContent("");
                setFormError("");
                // set success message
                setSuccessMessage("Article successfully added");
                return;
            });

        }else{
            setFormError("All fields are required");
        }
    }

    return (
        <div className="container">

            <div className="add-todo-form">

                <form onSubmit={handleSubmit}>
                {
                    form_error ? (
                        <p className="form-error">{form_error}</p>
                    ) : null
                }
                {
                    error ? (
                        <p className="form-error">{error.message}</p>
                    ) : null
                }
                {
                    success_message ? (
                        <p className="form-success">{success_message}. Go to <Link href="/"><a>home</a></Link></p>
                    ) : null
                }
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} placeholder="Article title" onChange={ (e) => setTitle(e.target.value)}  />
                </div>

                <div className="form-group">
                    <label>Summary</label>
                    <input type="text" value={summary} placeholder="Article summary" onChange={ (e) => setSummary(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea value={content} placeholder="Article content" onChange={ e => setContent(e.target.value)} rows={10}/>
                </div>
                
                <div className="form-group">
                    <button type="submit">
                        {
                            loading ? 'Loading' : "Add article"
                        }
                    </button>
                </div>
                </form>

            </div>

            <style jsx>{`
                .container {
                margin-top: 2rem;
                width:60%;
                margin: 0px auto;
                padding:2rem 0px;
                }
                .add-todo-form{
                    width:100%;
                }
                .form-group label{
                    width:100%;
                    display:block;
                    margin-bottom:10px;
                }
                .form-group input[type='text']{
                    width:100%;
                    padding:10px;
                    margin-bottom:10px;
                }
                .form-group textarea{
                    width:100%;
                    padding:10px;
                    margin-bottom:10px;
                }
                .form-error{
                    color:red;
                }
                .form-success{
                    color:green;
                }
            `}
            </style>
        </div>
    )
}
