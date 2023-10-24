"use client";

import { Order } from "@/app/types/Order";
import { OrderStatus } from "@/app/types/OrderStatus";
import { OrderItem } from "@/components/OrderItem";
import { api } from "@/libs/api";
import { Refresh, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { setTimeout } from "timers/promises";

const Page = () => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  const getOrders = async () => {
    setSearchInput('');
    setOrders([]);

    setLoading(true);
    const orderList: Order[] = await api.getOrders();
    setOrders(orderList);
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setSearchInput('');
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearchKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //console.log(event.code);
    if(event.code.toLowerCase() === 'enter' || event.code.toLowerCase() === 'numpadenter') {
      if(searchInput !== '') {
        let newOrders: Order[] = [];

        for (let i in orders) {
          if(orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i]);
          }
        }

        setFilteredOrders(newOrders);
      } else {
        setFilteredOrders(orders);
      }
    }
  }

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus);
    getOrders();
  }

  const handlePrintAction = (order: Order) => {
    setPrintOrder(order);
    // setTimeout(() => {
    //   if(window) window.print();      
    // }, 200);
  }

  return (
    <>
      <Box sx={{ my: 3, displayPrint: 'none' }}>
        
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>Pedidos</Typography>

            {loading && <CircularProgress size={24} />}

            {!loading &&
              <Button onClick={getOrders} size="small" sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
                <Refresh />
                <Typography
                  component="div" sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}
                >Atualizar</Typography>
              </Button>
            }            
          </Box>

          <TextField
            value={searchInput}
            onChange= {e => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKey}
            placeholder="Pesquise um pedido"
            variant="standard"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>  
              )
            }}
          />
        </Box>

        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
          {loading &&
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              
            </>
          }
          {!loading && filteredOrders.map((item, index) => (
              <Grid key={index} item xs={1}>
                <OrderItem
                  item={item}
                  onChangeStatus={handleChangeStatus}
                  onPrint={handlePrintAction}
                />
              </Grid>
            ))
          }
        </Grid>

      </Box>

      <Box sx={{ display: 'none', displayPrint: 'block' }}>
        
      </Box>
    </>
  );
}

export default Page;