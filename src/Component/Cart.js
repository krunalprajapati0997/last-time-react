import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import { Button } from 'react-bootstrap'
import { initial } from 'lodash';
import html2canvas from 'html2canvas';

function Cart() {



    const initialize = JSON.parse(localStorage.getItem("addtocart"))
    let history = useHistory

    const [myArray, setMyArray] = useState(initialize);
    const [item, setitem] = useState(initialize)

    const itemsPrice = myArray.reduce((a, c) => a + c.quantities * c.price, 0);
    const totalPrice = itemsPrice

    const increment = (items_id,quantities) => {
        if(quantities >=0){

            setMyArray(myArray => myArray.map((item) => items_id === item._id ? { ...item, quantities: parseInt(item.quantities) + 1 } : item))
        }else{
            return false
        }
        // console.log("gfghh", myArray);
    }

    const decrement = (items_id,quantities) => {
        if(quantities <= 1){
            return false
        }else{

            setMyArray(myArray => myArray.map((item) => items_id === item._id ? { ...item, quantities: parseInt(item.quantities) - 1 } : item))
        }
        // console.log("gfghh", myArray);
    }

    const Remove = (index) => {
        setTimeout(() => {
            const list = [...item];
            list.splice(index, 1);
            setitem(list);
            console.log(list, "sbdj")
            localStorage.setItem('addtocart', JSON.stringify(list))
            window.location.reload(false)
            history.push('/Cart')
        });
    }



    const print = () => {


        const divToDisplay = document.getElementById('div')
        html2canvas(divToDisplay,
            {
                useCORS: true,
                onrendered: function (canvas) {
                    divToDisplay.appendChild(canvas);
                }
            }).then(function (canvas) {
                const divImage = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                pdf.addImage(divImage, 'PNG', 0, 10);
                pdf.save("download.pdf");
            })
    };

    function myFunction() {
        let text = "Download your free Recipe !\nEither OK or Cancel.";
        if (window.confirm(text) == true) {
            text = print()
        } else {
            text = "You canceled!";
        }
    }



    return (

        <div>
            <div id='div'>

                <table class="table table-bordered">

                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantities</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    {
                        myArray.map((items, i) => {
                            return (
                                <tbody>
                                    <tr key={i}>
                                        <td>
                                            {items.name}
                                        </td>
                                        <td>
                                            {items.description}
                                        </td>
                                        <td>
                                            {items.quantities}
                                        </td>
                                        <td>
                                            {items.price}
                                        </td>

                                        <td>
                                            <img src={items.profile_url} width='120' height='100' />
                                        </td>
                                        <td>
                                            <Button onClick={() => Remove(i)}>Remove Item</Button>
                                        </td>
                                        <td>
                                            <Button onClick={myFunction}>print</Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => increment(items._id , items.quantities)}>+</Button>
                                            <p> {items.quantities}</p>
                                            <Button onClick={() => decrement(items._id , items.quantities)}>-</Button>
                                        </td>


                                    </tr>
                                </tbody>
                            )
                        })
                    }
                    <td>
                        Total Price:  {totalPrice}
                    </td>
                </table>
            </div>
        </div>




    )
}


export default Cart