import { Card, CardHeader, CardTitle } from "../ui/card"


const PageHeader = ({ title = "Feladatlista" }) => {
    return (
        <Card className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between`}>
            <CardHeader className="w-full sm:flex-1 flex items-center sm:items-center">
                <CardTitle className="w-full">
                    <h2>{title}</h2>
                </CardTitle>
            </CardHeader>
            {/* <CardContent className="w-full sm:flex-1 flex justify-end">

            </CardContent> */}
        </Card>
    )
}

export default PageHeader