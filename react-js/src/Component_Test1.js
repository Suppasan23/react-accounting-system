import './Component_Test1.css';  
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useContext} from 'react';
import DataContext from './data/DataContext';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function Component_Test1()
{
    const initData = 
    [
        {id:1,title:"เงินเดือน", amount:120000},
        {id:2,title:"ค่าที่พัก", amount:-20000},
        {id:3,title:"ค่าอาหาร", amount:-20000},
    ]

    const [items,setItems] = useState(initData)

    const [reportIncome,setReportIncome] = useState(0)
    const [reportExpense,setReportExpense] = useState(0)
    
    function onAddNewItem(newItem)
    {
        setItems(function(prevItem)
        {
            return [newItem, ...prevItem];
        });
    }

    useEffect (function()
    {
        const amounts = items.map(function(element){return element.amount;})
        const income = amounts.filter(function(element){return element>0;}).reduce(function(total,element){return total+=element;})
        const expense = (amounts.filter(function(element){return element<0;}).reduce(function(total,element){return total+=element;}))*-1

        setReportIncome(income)
        setReportExpense(expense)

    },[items,reportIncome,reportExpense])
 
    return (

        <DataContext.Provider value =
            {
                {
                    income : reportIncome,
                    expense: reportExpense
                }
            }>

            <div className='container'>
                <h1 className='title'>โปรแกรมบัญชี รายรับ - รายจ่าย</h1>
                <Router>
                    <div className='router-area'>

                        <ul className='horizontal-menu'>
                            <li>
                                <Link to ="/">ข้อมูลบัญชี</Link>
                            </li>
                            <li>
                                <Link to ="/insert">บันทึกข้อมูล</Link>
                            </li>
                        </ul>

                        <Routes>
                            <Route path="/" element={<Peport />} />
                            <Route path="/insert" element={<><Form1 onAddItem={onAddNewItem} /><Transaction items={items} /></>} />
                        </Routes>

                    </div>
                </Router>
            </div>

        </DataContext.Provider>
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
        const checkData = (title.trim().length > 0) && ((amount !== 0)&&(amount !== ""))
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
function Transaction({items})
{
    return(
        <div>
            <ul className='transaction'>
                <li className='li-bold'>รายการ<span>จำนวน</span></li>

                {items.map(function(element)
                {
                    return <Item {...element} key={element.id}/>
                })}

            </ul>
        </div>
    );
}


//////////////////////////////////////////////////////////////////////////////////////
function Item({title, amount})
{
    const status = amount < 0 ? "expense" : "income"
    const symbol = amount < 0 ? "-" : "+"
    const formatNumber=function(num)
    {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return(
        <li className={status}>{title} <span>{symbol}{formatNumber(Math.abs(amount))}</span>                
        </li>
    );
}


//////////////////////////////////////////////////////////////////////////////////////
function Peport() 
{
    const {income , expense} = useContext(DataContext)

    const formatNumber=function(num)
    {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    return (
      <div>
            <p className='label-a'>ยอดคงเหลือ (บาท)</p>
            <h1>฿{formatNumber(income-expense)}</h1>
            <div className="report-container">
                <div>
                    <p>รายได้ทั้งหมด</p>
                    <p className="report plus">฿{formatNumber(income)}</p>
                </div>
                <div>
                    <p>รายจ่ายทั้งหมด</p>
                    <p className="report minus">฿{formatNumber(expense)}</p>
                </div>
            </div>
      </div>
    );
}