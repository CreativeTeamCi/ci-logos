import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Notyf} from 'notyf'

const SubmitLogo = () => {
    const baseUrl = 'http://ci_logo.com.test/api'
    const formRef = useRef()
    // Create an instance of Notyf
    const notyf = new Notyf({duration: 5000, position: {x: 'right',y: 'top'}})
    const [activitiesArea, setActivitiesArea] = useState([])
    const initialForm = {
        'name' : '',
        'email' : '',
        'business_name' : '',
        'url' : '',
        'activity_areas_id' : null,
        'logo_png' : '',
        'svg_logo' : '',
    }
    const [myForm, setMyForm] = useState(initialForm)

    useEffect(()=>{
        // - Recuperation de la liste des secteurs d'activités
        axios.get(`${baseUrl}/activities-area`)
        .then(function (response) {
            setActivitiesArea(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    const submitForm = () => {
        // - Transfere les données dans une formData
        const form = new FormData()
        Object.keys(myForm).map(name=>{
            form.append(name,myForm[name])
            console.log('name', name)
        })
        // console.log('MyForm', myForm,form)
        // - Soumission du formulaire
        axios.post(`${baseUrl}/submission`,form)
        .then(function (response) {
            cleanFormErrorStyle()
            notyf.dismissAll();
            notyf.success(response.data.message);
            setMyForm(initialForm)
            // console.log('response', response)
        })
        .catch(function (error) {
            cleanFormErrorStyle()
            const errorsMessages = error.response.data.message
            // console.log('message', typeof errorsMessages)
            if (typeof errorsMessages=='object') {
                Object.keys(errorsMessages).map(key=>{
                    const name = key
                    const message = errorsMessages[key][0]
                    const element = document.querySelector(`input[name=${name}]`) ?? document.querySelector(`select[name=${name}]`)
                    if (element==null) return
                    // - Affichage de l'erreur
                    var small = document.createElement('small')
                    small.innerHTML = `<i class="fa fa-times-circle-o"></i> ${message}</small>`;
                    small.style.color = 'red';
                    element.style.borderColor = 'red';
                    insertAfter(small, element)
                })
            } else {
                notyf.dismissAll();
                notyf.error(errorsMessages);
            }
        });
    }

    const handleChangeText = event => {
        // - Mise à jour du formulaire
        setMyForm({
            ...myForm,
            [event.target.name]:event.target.value
        })
    }

    const handleChangeFile = event => {
        // - Mise à jour du formulaire
        setMyForm({
            ...myForm,
            [event.target.name]:event.target.files[0]
        })
    }

    const insertAfter = (newNode, referenceNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    const cleanFormErrorStyle = () => {
        Array.prototype.slice.call(document.getElementsByTagName('small')).forEach(
            function(item) {
                item.remove();
            }
        );
        ['input','select'].map(tagName=>{
            Array.prototype.slice.call(document.getElementsByTagName(tagName)).forEach(
                function(item) {
                    item.style.borderColor='';
                }
            );
        })
    }

    return (
        <>
            {/* <div className="crt-loader">
                <div>
                    <h1>CI Logos</h1>
                    <img src="assets/images/oval.svg" alt="Loading" />
                    <p>Powered By CreativeTeam</p>
                </div>
            </div> */}
            <div className="crt-background">
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
            </div>
            <div className="crt-wrapper">
                <div className="crt-theme-style">
                    <a href="javascript:;">Dark Mode</a>
                </div>
                <div className="crt-header sticky">
                    <div className="crt-header-content">
                        <div className="crt-header-logo">
                            <Link to='/'>CI Logos</Link>
                        </div>
                        <div className="crt-search-btn">
                            <i className="material-icons">search</i>
                        </div>
                        <div className="crt-header-search">
                            <form>
                                <label style={{width:'100%'}}>
                                    <input type="text" name="keyword" placeholder="Rechercher..." />
                                </label>
                                <input type="submit" name="submit" value="search" className="material-icons" />
                                <input type="button" name="close" value="close" className="material-icons" />
                            </form>
                        </div>
                        <div className="crt-clear-fix"></div>
                    </div>
                </div>
                <div className="crt-main">
                    <div className="crt-404">
                        <h1>Soumissions de logos pour la Côte d'Ivoire</h1>
                        <p>
                            Utilisez le formulaire ci-dessous pour soumettre un ou plusieurs logos aux archives de Nigeria Logos.
                            La révision et la fusion de votre logo peuvent prendre jusqu'à 48 heures.
                            Si vous êtes un développeur ou si vous avez un développeur disponible pour vous aider, vous pouvez contribuer directement au repo sur Github ici :
                        </p>
                        <br/>
                        <form id="add-submission" method="POST" enctype="multipart/form-data" method="{{route('submission.store')}}">
                            <div className="row">
                                <div className="col-100 name">
                                    <label for="name" className="float-left"><b>Votre nom </b><span className="text-danger">*</span></label>
                                    <input type="text" name="name" placeholder="Votre nom.." id="name" value={myForm.name} onChange={(e)=>handleChangeText(e)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-100 email">
                                    <label for="email" className="float-left">
                                        <b>Votre email</b>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" name="email" placeholder="abc@email.com" id="email" value={myForm.email} onChange={(e)=>handleChangeText(e)}/>
                                    <small className="float-left description_input">
                                        Nous en avons besoin pour pouvoir assurer un suivi avec vous au cas où des améliorations seraient recommandées
                                        et aussi pour que nous puissions vous faire savoir quand vos logos sont en ligne sur le site.
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-100 business_name">
                                    <label for="business_name" className="float-left">
                                        <b>Dénomination sociale de l'entreprise</b>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" name="business_name" id="business_name" placeholder="Ex: CreativeTeam (Communauté)" value={myForm.business_name} onChange={(e)=>handleChangeText(e)}/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-100 url">
                                    <label for="url" class="float-left">
                                        <b>Site web de l'entreprise</b>
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" name="url" id="url" placeholder="Ex: https://creative-team.ci" value={myForm.url} onChange={(e)=>handleChangeText(e)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-100 activity_areas_id">
                                    <label for="activity_areas_id" className="float-left">
                                        <b>Secteur d'activité</b>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <select name="activity_areas_id" onChange={(e)=>handleChangeText(e)}>
                                        <option value="0">Choisir le secteur</option>
                                        {
                                            activitiesArea.map(activity=>{
                                                return (<option value={activity.id} selected={activity.id==myForm.activity_areas_id}>{activity.libelle}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-100 logo_png">
                                    <label for="png_logo" className="float-left">
                                        <b>Logo PNG</b>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input name="logo_png" id="logo_png" type="file"  accept=".png" onChange={(e)=>handleChangeFile(e)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-100 logo_svg">
                                    <label for="svg_logo" className="float-left">
                                        <b>Logo SVG</b>
                                    </label>
                                    <br/><br/>
                                    <input name="logo_svg" id="logo_svg" type="file" accept=".svg" onChange={(e)=>handleChangeFile(e)}/>
                                    <small className="float-left description_input">
                                        Veuillez vous assurer que vos fichiers SVG sont propres et qu'ils n'ont pas de
                                        formats d'image (par exemple png, jpgs) intégrés
                                    </small><br/><br/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-100">
                                    <input type="button" className="soumettre" value="Soumettre" onClick={submitForm}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="crt-footer">
                    <div className="crt-footer-content">
                        <div className="crt-footer-sn">
                            <ul>
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                            </ul>
                        </div>
                        <div className="crt-footer-links">
                            <ul>
                                <li><a href="#">© CreativeTeam 2020 </a></li>
                            </ul>
                        </div>
                        <div className="crt-clear-fix"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubmitLogo;
