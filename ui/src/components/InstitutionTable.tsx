import { useEffect, useState } from "react";
import { createInstitution, deactivateInstitution, getInstitutions, type CreateInstitutionRequest, type Institution, type InstitutionType } from "../services/institutionService";

type InstitutionTableProps = {
    regions: string[],
    types: InstitutionType[],
    activeStatus: string | undefined,
};


export const InstitutionTable: React.FC<InstitutionTableProps> = ({ regions, types, activeStatus }) => {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [newInstitution, setNewInstitution] = useState<CreateInstitutionRequest>({
        edrpou: 0,
        name: "",
        region: "",
        type: ""
    });
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getInstitutions({ regions, types, activeStatus }).then(setInstitutions);
    }, [regions, types, activeStatus, reload]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type } = e.target;

        setNewInstitution(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    return (
        <div>
            <form onSubmit={() => {
                createInstitution(newInstitution)
                    .then(() => setReload(true))
            }}>
                <div>
                    <label>
                        EDRPOU:
                        <input
                            type="number"
                            name="edrpou"
                            value={newInstitution.edrpou}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newInstitution.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Region:
                        <input
                            type="text"
                            name="region"
                            value={newInstitution.region}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={newInstitution.type}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EDRPOU</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th>Type</th>
                            <th>Active</th>
                            <th>Deactivate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {institutions.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.edrpou}</td>
                                <td>{p.name}</td>
                                <td>{p.region?.name}</td>
                                <td>{p.type}</td>
                                <td>{p.isActive ? "Yes" : "No"}</td>
                                <td><button onClick={() => {
                                    if (confirm("Are you sure?"))
                                        deactivateInstitution(p.id)
                                            .then(() => setReload(true));
                                }}>🗑️</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

