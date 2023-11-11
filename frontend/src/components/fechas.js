import {DatePicker} from 'antd';
import moment, { fn } from 'moment';
import { useState } from 'react';
const {RangePicker} = DatePicker;
function Fechas(){
    const [dates, setDates] = useState([]);
    return(
        <div>
            <RangePicker
                placeholder={['Inicio', 'Fin']}
                style={{border:'none', color:'black'}}
                
                onChange={(values)=>{
                    setDates(values?.map(item=>{
                        return moment(item).format('YYYY-DD-MM')
                    }))
                }}
            />
        </div>
    )
}
export default Fechas;