import './Component_Test1.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { element } from 'prop-types';


function Component_Test1()
{

    const initData = 
    [
        {id:1,title:"เงินเดือน", amount:"120000"},
        {id:2,title:"ค่าที่พัก", amount:"30000"},
        {id:3,title:"ค่าอาหาร", amount:"1000"},
    ]

    const [items,setItems] = useState(initData)

    function onAddNewItem(newItem)
    {
        setItems(function(prevItem) 
        {
            return [newItem, ...prevItem];
        });
    }

    return (
        <div className='container'>
            <h1 className='title'>โปรแกรมบัญชี รายรับ - รายจ่าย</h1>
            <Form1 onAddItem={onAddNewItem}/>
            <Transaction items = {items}/>
        </div>
    );


}

export default Component_Test1;


//////////////////////////////////////////////////////////////////////////////////////
function Form1(onAddItem)
{
    
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState(0)
    
    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label className="label-a">ชื่อรายการ</label>
                    <input className="input-a" type="text" placeholder="ระบุชื่อรายการของคุณ" onChange={inputTitle} value={title}></input>
                </div>
                <div className="form-control">
                    <label className="label-a">จำนวนเงิน</label>
                    <input className="input-a" type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount}></input>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <button className="btn-a" type="submit">เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    );

    function saveItem(event)
    {
        event.preventDefault()
        const itemData = {
                            id:uuidv4(),
                            title:title,
                            amount:Number(amount)
                        }
        onAddItem.onAddItem(itemData)
        setTitle('')
        setAmount(0)
    }

    function inputTitle(event)
    {
       setTitle(event.target.value)
    }

    function inputAmount(event)
    {
        setAmount(event.target.value)
    }
}


//////////////////////////////////////////////////////////////////////////////////////
function Transaction ({items})
{
    return(
        <ul className='transaction'>
            <li className='li-bold'>รายการ<span>จำนวน</span></li>

            {items.map(function(element)
            {
                return <Item {...element} key={element.id}/>
            })}

        </ul>
    );
}

function Item ({title, amount})
{
    return(
        <li className='item'>{title}<span>{amount}</span></li>
    );
}