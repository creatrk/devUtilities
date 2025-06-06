import { Base64Converter, JsonFormatter, JsonToCsvConverter } from '../Utilities';

const List = [
    {
        'Dev Utilities': [
            { 'Base64 Converter': { path: "/base64converter", element: <Base64Converter /> } },
            { 'JSON Formatter': { path: "/jsonformatter", element: <JsonFormatter /> } },
            { 'JSON to CSV Converter': { path: "/jsontocsv", element: <JsonToCsvConverter /> } }
        ]
    }
]

export default List