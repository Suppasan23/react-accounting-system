import './Component_Test1.css'


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
    return(
        <ul className='transaction'>
            <Item/>
            <Item/>
            <Item/>
        </ul>
    );
}

    function Item (){
        const name = "เดินห้างซื้อของ"
        const amount = 50000
        const unit = "บาท"
        return(
            <li className='item'>{name}<span>{amount} {unit}</span></li>
        );
    }
    
