import './Component_Test1.css'; 
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from 'react';


function Component_Test1()
{

    const initData = 
    [
        {id:1,title:"เงินเดือน", amount:"120000"},
        {id:2,title:"ค่าที่พัก", amount:"-30000"},
        {id:3,title:"ค่าอาหาร", amount:"-20000"},
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
    const [amount,setAmount] = useState('')
    const [formValid,setFormValid] = useState(false)

    function inputTitle(event)
    {
       setTitle(event.target.value)
    }

    function inputAmount(event)
    {
        setAmount(event.target.value)
    }

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
        setAmount('')
    }

    useEffect(function()
    {
        const checkData = (title.trim().length > 0) && (amount > 0) 
        setFormValid(checkData)
    },[title,amount])
    
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
                    <button className="btn-a" type="submit" disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    );

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

//////////////////////////////////////////////////////////////////////////////////////
function Item ({title, amount})
{
    const status = amount < 0 ? "expense" : "income"
    const symbol = amount < 0 ? "-" : "+"

    return(
        <li className={status}>{title} <span>{symbol}{Math.abs(amount)}</span></li>
    );
}