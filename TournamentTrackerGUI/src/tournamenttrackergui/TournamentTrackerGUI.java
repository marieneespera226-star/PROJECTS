/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package tournamenttrackergui;

/**
 *
 * @author Acer
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

public class TournamentTrackerGUI extends JFrame {

    private JTextField sportField, teamCountField;
    private JPanel inputPanel, matchPanel;
    private JButton startButton, nextRoundButton;
    private ArrayList<String> teams = new ArrayList<>();
    private ArrayList<String> allTeamsOriginal = new ArrayList<>();
    private ArrayList<JTextField> teamFields = new ArrayList<>();
    private int round = 1;

    public TournamentTrackerGUI() {
        setTitle("Tournament Tracker");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        setupInputScreen();
    }

    private void setupInputScreen() {
        inputPanel = new JPanel();
        inputPanel.setLayout(new GridLayout(5, 1));

        sportField = new JTextField();
        teamCountField = new JTextField();
        startButton = new JButton("Next");

        inputPanel.add(new JLabel("Enter Sport Name:"));
        inputPanel.add(sportField);
        inputPanel.add(new JLabel("Enter Number of Teams (Power of 2):"));
        inputPanel.add(teamCountField);
        inputPanel.add(startButton);

        add(inputPanel);
        setVisible(true);

        startButton.addActionListener(e -> {
            String sport = sportField.getText().trim();
            int count;
            try {
                count = Integer.parseInt(teamCountField.getText().trim());
                if ((count & (count - 1)) != 0 || count < 2) {
                    JOptionPane.showMessageDialog(this, "Enter a valid power of 2 (e.g. 4, 8, 16)");
                    return;
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, "Please enter a valid number.");
                return;
            }

            collectTeamNames(count);
        });
    }

    private void collectTeamNames(int count) {
        inputPanel.removeAll();
        inputPanel.setLayout(new GridLayout(count * 2 + 1, 1));
        teamFields.clear();

        for (int i = 0; i < count; i++) {
            JTextField tf = new JTextField();
            tf.setToolTipText("Team " + (i + 1));
            teamFields.add(tf);
            inputPanel.add(new JLabel("Team " + (i + 1) + ":"));
            inputPanel.add(tf);
        }

        JButton continueButton = new JButton("Start Tournament");
        inputPanel.add(continueButton);
        inputPanel.revalidate();
        inputPanel.repaint();

        continueButton.addActionListener(e -> {
            teams.clear();
            for (JTextField tf : teamFields) {
                String name = tf.getText().trim();
                if (name.isEmpty()) {
                    JOptionPane.showMessageDialog(this, "All team names must be filled.");
                    return;
                }
                teams.add(name);
            }
            allTeamsOriginal = new ArrayList<>(teams);  // save initial list
            showMatches();
        });
    }

    private void showMatches() {
        getContentPane().removeAll();
        matchPanel = new JPanel();
        matchPanel.setLayout(new BoxLayout(matchPanel, BoxLayout.Y_AXIS));
        matchPanel.setBorder(BorderFactory.createTitledBorder("Round " + round + " Matches"));

        ArrayList<JComboBox<String>> matchSelectors = new ArrayList<>();

        for (int i = 0; i < teams.size(); i += 2) {
            String team1 = teams.get(i);
            String team2 = teams.get(i + 1);
            JPanel match = new JPanel(new FlowLayout());

            JLabel matchLabel = new JLabel(team1 + " vs " + team2);
            JComboBox<String> winnerBox = new JComboBox<>(new String[]{team1, team2});

            match.add(matchLabel);
            match.add(new JLabel("→ Winner:"));
            match.add(winnerBox);

            matchPanel.add(match);
            matchSelectors.add(winnerBox);
        }

        nextRoundButton = new JButton("Next Round");
        nextRoundButton.addActionListener(e -> {
            ArrayList<String> winners = new ArrayList<>();
            for (JComboBox<String> box : matchSelectors) {
                winners.add((String) box.getSelectedItem());
            }

            if (winners.size() == 1) {
                String sport = sportField.getText().trim();
                String champion = winners.get(0);

                JOptionPane.showMessageDialog(this, "🏆 " + champion + " is the Champion!");
                HistoryManager.saveTournament(sport, champion, allTeamsOriginal);

                setVisible(false);
                new HistoryDashboard();
            } else {
                teams = winners;
                round++;
                showMatches();
            }
        });

        matchPanel.add(nextRoundButton);
        add(matchPanel);
        revalidate();
        repaint();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(TournamentTrackerGUI::new);
    }
}
