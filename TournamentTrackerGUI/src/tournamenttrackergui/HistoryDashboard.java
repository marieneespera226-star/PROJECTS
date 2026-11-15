/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package tournamenttrackergui;

/**
 *
 * @author Acer
 */

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class HistoryDashboard extends JFrame {

    public HistoryDashboard() {
        setTitle("🏁 Tournament History");
        setSize(700, 450);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        String[] columnNames = {"Date", "Sport", "Winner", "Participants"};
        DefaultTableModel model = new DefaultTableModel(columnNames, 0);
        JTable table = new JTable(model);

        List<String[]> history = HistoryManager.loadTournamentHistory();
        for (String[] entry : history) {
            model.addRow(entry);
        }

        JScrollPane scrollPane = new JScrollPane(table);

        JButton newGameButton = new JButton("🎮 Start New Tournament");
        newGameButton.addActionListener(e -> {
            dispose();  // Close history window
            new TournamentTrackerGUI();  // Open a fresh setup screen
        });

        JPanel bottomPanel = new JPanel();
        bottomPanel.add(newGameButton);

        add(scrollPane, BorderLayout.CENTER);
        add(bottomPanel, BorderLayout.SOUTH);
        setVisible(true);
    }
}
