import geopandas as gpd
import pandas as pd

# Parameters
filename_geojson_input = 'datasets/cb_2018_us_state_20m.geojson'
filename_data = 'datasets/covid_data_states.csv'
filename_geojson_output = 'datasets/cb_2018_us_state_20m_covid.geojson'

# Read the GeoJson file into a dataframe variable
df_geojson = gpd.read_file(filename_geojson_input,driver='GeoJSON')

# Read the Datasets downloaded from Kaggle
df_state_data = pd.read_csv(filename_data)

column_data_mapping = {
    'USA State':'STATE_NAME',
    'Total Cases':'TOTAL_CASES',
    'Total Deaths':'TOTAL_DEATHS',
    'Total Recovered':'TOTAL_RECOVERED',
    'Active Cases':'ACTIVE_CASES',
    'Tot Cases/ 1M pop':'TOTAL_CASES_BY_1M_POP',
    'Deaths/ 1M pop':'TOTAL_DEATHS_BY_1M_POP',
    'Total Tests':'TOTAL_TESTS',
    'Tests/ 1M pop':'TOTAL_TESTS_BY_1M_POP',
    'Population': 'POPULATION'
}

df_state_data.rename(columns=column_data_mapping, inplace=True)

# Add the state variables into the geojson dataframe
columns_chosen = ['TOTAL_CASES','TOTAL_DEATHS','TOTAL_RECOVERED','ACTIVE_CASES','TOTAL_CASES_BY_1M_POP','TOTAL_DEATHS_BY_1M_POP','TOTAL_TESTS','TOTAL_TESTS_BY_1M_POP','STATE_NAME']
df_geojson_merged = df_geojson.merge(df_state_data[columns_chosen], how='left', left_on='NAME', right_on='STATE_NAME')

# Export dataframe into a new geojson file
df_geojson_merged.to_file(filename_geojson_output, driver='GeoJSON')

print(f"GeoJsonParser: {filename_geojson_output} generated")