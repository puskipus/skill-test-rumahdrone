<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Stok</title>
    <style>
        /* Define styles for the PDF document */
        body {
            font-family: Arial, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1>Data Stok</h1>
    <table>
        <thead>
            <tr>
                <th>Nama Barang</th>
                <th>Jenis</th>
                <th>Keterangan</th>
                <th>Jumlah</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stok as $s)
            <tr>
                <td>{{ $s['Nama Barang'] }}</td>
                <td>{{ $s['Jenis'] }}</td>
                <td>{{ $s['Keterangan'] }}</td>
                <td>{{ $s['Jumlah'] }}</td>
                <td>{{ $s['Tanggal'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
