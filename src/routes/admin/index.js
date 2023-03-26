import classes from "./index.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
    const [apiData, setData] = useState({ "reviews": [], "vechiles": [] });
    const [creds, setCreds] = useState({ "username": "", "password": "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(window.APIROOT + "data");
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    const saveChanges = async () => {
        let newData = { "config": apiData, "credentials": creds };
        console.log(newData);
        try {
            const res = await axios.post(window.APIROOT + 'save', newData);
            console.log(res.data);
            if (res.data.success) alert("Changed saved successfully!");
            else alert("Invalid admin credentials!");
        } catch (error) {
            alert("Failed to save changes!");
        }
    }

    return (
        <div className={classes.formBody}>
            <h1>Admin credentials</h1>
            <p>
                <div>Username</div>
                <input type="text" value={creds.username} onChange={(e) => setCreds({ ...creds, "username": e.target.value })} />
                <div>Password</div>
                <input type="text" value={creds.password} onChange={(e) => setCreds({ ...creds, "password": e.target.value })} />
            </p>
            <h1>Contact Info</h1>
            <p>
                <div>Call number</div>
                <input type="text" value={apiData.call} onChange={(e) => setData({ ...apiData, "call": e.target.value })} />
                <div>Whatsapp number</div>
                <input type="text" value={apiData.whatsapp} onChange={(e) => setData({ ...apiData, "whatsapp": e.target.value })} />
                <div>Location</div>
                <input type="text" value={apiData.location} onChange={(e) => setData({ ...apiData, "location": e.target.value })} />
                <div>Review link</div>
                <input type="text" value={apiData.writereview} onChange={(e) => setData({ ...apiData, "writereview": e.target.value })} />
            </p>
            <h1>Reviews</h1>
            {
                apiData.reviews.map((e, id) => {
                    return <p>
                        <h3>[ {id + 1} ]</h3>
                        <div>Name</div>
                        <input type="text" value={apiData.reviews[id].name} onChange={(e) => {
                            let reviews = apiData.reviews;
                            reviews[id].name = e.target.value;
                            setData({ ...apiData, "reviews": reviews });
                        }} />
                        <div>Content</div>
                        <textarea rows={10} value={apiData.reviews[id].content} onChange={(e) => {
                            let reviews = apiData.reviews;
                            reviews[id].content = e.target.value;
                            setData({ ...apiData, "reviews": reviews });
                        }} />
                    </p>
                })
            }
            <h1>Vechiles</h1>
            {
                apiData.vechiles.map((e, id) => {
                    return <p>
                        <h3>[ {id + 1} ]</h3>
                        <h3 className={classes.delete} onClick={
                            () => {
                                let vechiles = apiData.vechiles;
                                vechiles.splice(id, 1);
                                setData({ ...apiData, "vechiles": vechiles });
                            }
                        }>Delete vechile</h3>
                        <div>Name</div>
                        <input type="text" value={e.name} onChange={(e) => {
                            let vechiles = apiData.vechiles;
                            vechiles[id].name = e.target.value;
                            setData({ ...apiData, "vechiles": vechiles });
                        }} />
                        <div>Cost per day</div>
                        <input type="text" value={e.costPerDay} onChange={(e) => {
                            let vechiles = apiData.vechiles;
                            vechiles[id].costPerDay = e.target.value;
                            setData({ ...apiData, "vechiles": vechiles });
                        }} />
                        <div>Km limit</div>
                        <input type="text" value={e.limit} onChange={(e) => {
                            let vechiles = apiData.vechiles;
                            vechiles[id].limit = e.target.value;
                            setData({ ...apiData, "vechiles": vechiles });
                        }} />
                        <div>Image link</div>
                        <input type="text" value={e.image} onChange={(e) => {
                            let vechiles = apiData.vechiles;
                            vechiles[id].image = e.target.value;
                            setData({ ...apiData, "vechiles": vechiles });
                        }} />
                        <div>About</div>
                        <textarea rows={10} value={e.about} onChange={(e) => {
                            let vechiles = apiData.vechiles;
                            vechiles[id].about = e.target.value;
                            setData({ ...apiData, "vechiles": vechiles });
                        }} />
                    </p>
                })
            }
            <h3 className={classes.btn} onClick={
                () => {
                    let vechiles = apiData.vechiles;
                    vechiles.push({
                        "name": "",
                        "costPerDay": "",
                        "limit": "",
                        "about": "",
                        "image": ""
                    });
                    setData({ ...apiData, "vechiles": vechiles });
                }
            }>Add new vechile</h3>
            <h3 className={classes.btn} onClick={saveChanges}>Save changes</h3>
        </div>
    );
}