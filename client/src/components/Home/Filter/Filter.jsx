import styles from './Filter.module.css';

export default function Filter(props) {

    const { filterState, setFilterState, setCurrentPage } = props;

    const handleFilterChange = (event) => {
        console.log("cambiando filtro")
        const { name, value, checked } = event.target;
        // console.log(name, value, checked)
        if (name === 'diets') {
            setFilterState((prevFilter) => {
                let newDiets = [...prevFilter.diets];
                //   console.log(newDiets)
                if (checked) {
                    newDiets.push(parseInt(value));
                } else {
                    newDiets = newDiets.filter((diet) => diet !== parseInt(value));
                }
                return {
                    ...prevFilter,
                    diets: newDiets
                }
            })
        } else {
            setFilterState((prevFilter) => ({
                ...prevFilter,
                [name]: value
            }))
        }
        // console.log(currentPage) 
        setCurrentPage(1);
    }


    return (
        <div>
            <div className={styles.checkboxContainer}>
                <label>Seleccione las dietas:</label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='1'
                        checked={filterState.diets.includes(1)}
                        onChange={handleFilterChange}
                    />
                    Vegetarian
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='2'
                        checked={filterState.diets.includes(2)}
                        onChange={handleFilterChange}
                    />
                    Vegan
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='3'
                        checked={filterState.diets.includes(3)}
                        onChange={handleFilterChange}
                    />
                    Gluten Free
                </label>
            </div>
            <div className={styles.checkboxContainer}>
                <label>Filtrar por origen:</label>
                <label>
                    <input
                        type="radio"
                        name="origin"
                        value="api"
                        checked={filterState.origin === "api"}
                        onChange={handleFilterChange}
                    />
                    New recipes
                </label>
                <label>
                    <input
                        type="radio"
                        name="origin"
                        value="database"
                        checked={filterState.origin === "database"}
                        onChange={handleFilterChange}
                    />
                    My recipes
                </label>
                <label>
                    <input
                        type="radio"
                        name="origin"
                        value="all"
                        checked={filterState.origin === "all"}
                        onChange={handleFilterChange}
                    />
                    All recipes
                </label>
            </div>
            <div className={styles.checkboxContainer}>
                <label>Ordenar por:</label>
                <label>
                    <input
                        type="radio"
                        name="order"
                        value="nameAsc"
                        checked={filterState.order === "nameAsc"}
                        onChange={handleFilterChange}
                    />
                    Nombre (Ascendente)
                </label>
                <label>
                    <input
                        type="radio"
                        name="order"
                        value="nameDesc"
                        checked={filterState.order === "nameDesc"}
                        onChange={handleFilterChange}
                    />
                    Nombre (Descendente)
                </label>
                <label>
                    <input
                        type="radio"
                        name="order"
                        value="healthScore"
                        checked={filterState.order === "healthScore"}
                        onChange={handleFilterChange}
                    />
                    Comida saludable
                </label>
                <button onClick={() => {                    
                    setFilterState({diets: [], order: '', origin: 'all'});
                    setCurrentPage(1);
                    }}>Limpiar</button>
            </div>
        </div>
    )
}