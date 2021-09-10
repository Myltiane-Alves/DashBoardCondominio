import React, { useState, useEffect } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CButton,
    CSwitch,
    CDataTable
} from '@coreui/react';
import useApi from '../services/api';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



export default function Wall() {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [photoUrl, setPhotoUrl] = useState('');


    const fields = [
        { label: "Recuperado", key: "status",filter: false,sorter: false},
        { label: "Local Encontrado", key: "where",sorter: false},
        { label: "Descrição", key: "description",sorter: false},
        { label: "Foto", key: "photo",filter: false,sorter: false},
        { label: "Data", key: "datecreated"},  
    ];

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        const result = await api.getFoundAndLost();
        setLoading(false);
        if (result.error === '') {
            setList(result.list);
        } else {
            setList(result.error);
        }
    }

    const handleSwitchClick = async (item) => {
        setLoading(true);
        const result = await api.updateFoundAndLost(item.id)
        setLoading(false);
        if(result.error === '') {
            getList()
        } else {
            alert(result.error)
        }
    }

    const showLightbox = (url) => {
        setPhotoUrl(url)
    }

    return (
     <>
        <CRow>
          <CCol>
           <h2>Achados e Perdidos</h2>
            <CCard>
                <CCardBody>
                    <CDataTable
                        items={list}
                        fields={fields}
                        loading={loading}
                        noItemsViewSlot=" "
                        columnFilter
                        sorter
                        hover
                        striped
                        bordered
                        pagination
                        itemsPerPage={10}
                        scopedSlots={{
                            'photo': (item) => (
                             <td>
                                {item.photo && 
                                    <CButton color="success" onClick={()=>showLightbox(item.photo)}>
                                        Ver Foto
                                    </CButton>
                                }
                             </td>
                            ),
                            'datecreated': (item) => (
                             <td>
                                {item.datecreated_formatted}
                             </td>
                            ),
                            'status': (item) => (
                             <td>
                               <CSwitch 
                                 color="success"
                                 checked={item.status === 'recovered'}
                                 onChange={(e)=>handleSwitchClick(item)}   
                               />
                             </td>
                            ),
                        }}
                    />
                </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {photoUrl && 
            <Lightbox 
                mainSrc={photoUrl}
                onCloseRequest={()=>setPhotoUrl('')}
                reactModalStyle={{overlay: {zIndex: 9999}}}
            />
        }
     </>
    );
}