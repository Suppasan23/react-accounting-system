import './Component_Test1.css';
import { v4 as uuidv4 } from 'uuid';


function Component_Test1(){
    return (
        <div className='container'>
            <Title/>
            <Transaction/>
        </div>
    );
}

export default Component_Test1;


//////////////////////////////////////////////////////////////////////////////////////
function Title(){
    return(
        <h1 className='title'>โปรแกรมบัญชี รายรับ - รายจ่าย</h1>
    );
}

//////////////////////////////////////////////////////////////////////////////////////
function Transaction (){
    const data = [
        {title:"เงินเดือน", amount:"120000"},
        {title:"ค่าที่พัก", amount:"30000"},
        {title:"ค่าอาหาร", amount:"1000"},
        {title:"ค่าเดินทาง", amount:"200"},
        {title:"ค่าไฟฟ้า-ประปา", amount:"500"}
    ]
    return(
        <ul className='transaction'>
            <li className='li-bold'>รายการ<span>จำนวน</span></li>
            <Item title={data[0].title} amount={data[0].amount} key={uuidv4()}/>
            <Item title={data[1].title} amount={data[1].amount} key={uuidv4()}/>
            <Item title={data[3].title} amount={data[3].amount} key={uuidv4()}/>
            <Item title={data[4].title} amount={data[4].amount} key={uuidv4()}/>
        </ul>
    );
}

function Item ({title, amount}){
    return(
        <li className='item'>{title}<span>{amount}</span></li>
    );
}