import { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail(props) {

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    console.log(detail)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const apiDetail = await axios.get(`http://localhost:3001/recipes/${id}`);
                setDetail(apiDetail.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };


        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div>
                <span className={styles.loader}></span>
            </div>
        )
    }

    // console.log("entrando a los detalles")
    return (
        <div>
            <h1>{detail.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: detail.summary }}></div>
            <img src={detail.image} alt="Image Food" />
        </div>
    )
}