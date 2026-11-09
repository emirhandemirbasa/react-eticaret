import React, { useEffect } from 'react'
import { getFavoriteProductDetails } from '../../redux/admin/dashboardSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

function TopFavoritesBarChart() {
    const dispatch = useDispatch();
    const { favorite } = useSelector(store => store.dashboard);
    useEffect(() => {
        const getFavoriteProductsDetails = async () => {
            await dispatch(getFavoriteProductDetails());
        }
        getFavoriteProductsDetails();
    }, [])
    console.log(favorite);
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                p: 2,
                backgroundColor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
                    En Çok Favorilenen Ürünler
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Kullanıcıların favori listelerine en çok eklediği ilk 10 ürünün dağılımı.
                </Typography>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <BarChart
                        dataset={favorite}
                        xAxis={[
                            {
                                scaleType: 'band',
                                dataKey: 'kitapAdi',
                                // Uzun ürün isimlerinin üst üste binmesini önlemek için açı verebilirsin
                                tickLabelStyle: {
                                    angle: -15,
                                    textAnchor: 'end',
                                    fontSize: 12,
                                },
                            },
                        ]}
                        series={[
                            {
                                dataKey: 'count',
                                label: 'Favori Sayısı',
                                color: '#6366f1', // Modern bir mor/indigo tonu (Admin paneline çok yakışır)
                                borderRadius: 6, // Sütunların üst köşelerini yumuşatır
                            },
                        ]}
                        height={380}
                        margin={{ top: 20, bottom: 70, left: 40, right: 10 }}
                        slotProps={{
                            legend: { hidden: true }, // Tek seri olduğu için lejantı gizleyebiliriz
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default TopFavoritesBarChart