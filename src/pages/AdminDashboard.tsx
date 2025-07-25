import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Shield, Package, ShoppingCart, LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { adminAPI } from "@/utils/api";

interface AdminData {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  prepTime?: string;
  rating: number;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: number;
  userId: number;
  items: unknown[];
  totalAmount: number;
  status: string;
  deliveryAddress?: string;
  customerName: string;
  customerPhone?: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    prepTime: "",
    rating: "4.5",
    popular: false,
    isAvailable: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    
    fetchMenuItems();
    fetchOrders();
  }, [navigate]);

  const fetchMenuItems = async () => {
    try {
      const data = await adminAPI.getMenuItems();
      setMenuItems(data);
    } catch (error) {
      setError('Failed to fetch menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await adminAPI.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSubmitMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating)
      };

      if (editingItem) {
        await adminAPI.updateMenuItem(editingItem.id.toString(), itemData);
        setSuccess('Menu item updated successfully');
      } else {
        await adminAPI.createMenuItem(itemData);
        setSuccess('Menu item created successfully');
      }

      resetForm();
      fetchMenuItems();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Operation failed');
    }
  };

  const handleDeleteMenuItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      await adminAPI.deleteMenuItem(id.toString());
      setSuccess('Menu item deleted successfully');
      fetchMenuItems();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Delete failed');
    }
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      prepTime: item.prepTime || "",
      rating: item.rating.toString(),
      popular: item.popular,
      isAvailable: item.isAvailable
    });
    setShowAddForm(true);
  };

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      await adminAPI.updateOrderStatus(orderId.toString(), status);
      setSuccess('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Update failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      prepTime: "",
      rating: "4.5",
      popular: false,
      isAvailable: true
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-orange-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-gold" />
            <div>
              <h1 className="text-3xl font-playfair font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {admin?.username}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="menu" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="menu">
              <Package className="h-4 w-4 mr-2" />
              Menu Management
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Order Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Menu Items</CardTitle>
                    <CardDescription>
                      Manage your restaurant menu items
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddForm && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{editingItem ? 'Edit' : 'Add'} Menu Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitMenuItem} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beverages">Beverages</SelectItem>
                                <SelectItem value="mainDishes">Main Dishes</SelectItem>
                                <SelectItem value="snacks">Snacks</SelectItem>
                                <SelectItem value="desserts">Desserts</SelectItem>
                                <SelectItem value="appetizers">Appetizers</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="prepTime">Prep Time</Label>
                            <Input
                              id="prepTime"
                              value={formData.prepTime}
                              onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                              placeholder="e.g., 15 min"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rating">Rating</Label>
                            <Input
                              id="rating"
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={formData.rating}
                              onChange={(e) => setFormData({...formData, rating: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit">
                            {editingItem ? 'Update' : 'Create'} Item
                          </Button>
                          <Button type="button" variant="outline" onClick={resetForm}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          <Badge variant={item.isAvailable ? "default" : "secondary"}>
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditMenuItem(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteMenuItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>${order.totalAmount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="preparing">Preparing</SelectItem>
                              <SelectItem value="ready">Ready</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;