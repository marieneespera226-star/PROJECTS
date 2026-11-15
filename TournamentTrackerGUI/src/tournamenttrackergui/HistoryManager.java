/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package tournamenttrackergui;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class HistoryManager {
    private static final String FILE_PATH = "tournament_history.csv";

    public static void saveTournament(String sport, String winner, List<String> participants) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, true))) {
            String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            String participantList = String.join(" | ", participants);
            String line = String.join(",", date, sport, winner, participantList);
            writer.write(line);
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<String[]> loadTournamentHistory() {
        List<String[]> history = new ArrayList<>();
        File file = new File(FILE_PATH);
        if (!file.exists()) return history;

        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            while ((line = reader.readLine()) != null) {
                history.add(line.split(",", 4));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return history;
    }
}


