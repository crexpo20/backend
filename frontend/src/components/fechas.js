import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const { RangePicker } = DatePicker;

function Fechas() {
    const [dates, setDates] = useState([]);

    const handleDateChange = (values) => {
        // Formatear las fechas y establecerlas en localStorage
        const formattedDates = values?.map(item => item.format('YYYY-MM-DD'));
        localStorage.setItem('fechaini', formattedDates[0] || '');
        localStorage.setItem('fechafin', formattedDates[1] || '');

        // Actualizar el estado con las fechas formateadas
        setDates(formattedDates);

        // Imprimir las fechas seleccionadas en la consola
        console.log('Fechas seleccionadas:', formattedDates);
    };

    return (
        <div>
            <RangePicker
                placeholder={[localStorage.getItem("fechaini"), localStorage.getItem("fechafin")]}
                style={{ border: 'none', color: 'black' }}
                onChange={handleDateChange}
            />
        </div>
    );
}

export default Fechas;
